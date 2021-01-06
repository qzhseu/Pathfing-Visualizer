const log = console.log

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const { ObjectID } = require('mongodb')

const { User } = require('../models/user')
const { RoundScore } = require('../models/score')

const { mongoChecker, isMongoError } = require("./helpers/mongo_helpers");
const { authenticate } = require("./helpers/authentication");
const {handleValidationError}=require("./helpers/parseError");
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();
const defaultImgURL = 'https://res.cloudinary.com/dui5l4hin/image/upload/v1607398929/default_Icon.png';

const cloudinary = require('cloudinary');
cloudinary.config({
	cloud_name: 'dui5l4hin',
	api_key: '971272746478646',
	api_secret: '2iOZghZiKWtE9YC-Bo5VJPPHQoE'
});

//Register a user
router.post('/api/users/register', mongoChecker, async (req, res) => {
	const user = new User({
		_id: new mongoose.Types.ObjectId(),
        username: req.body.username,
		email: req.body.email,
        password: req.body.password,
		role: 'user',
		image_url: defaultImgURL
    })
	try {
        const alreadyExist = await User.exists({username: req.body.username , email: req.body.email});
		if(alreadyExist){
			res.status(409).send({Error:{error: "The user have registered."}})
		}else{
			const newUser = await user.save()
		    res.send(newUser)
        }
	} catch (error) {
		if (isMongoError(error)) { 
			res.status(500).send({Error: 'Internal server error'})
		} else if(error.name === 'MongoError' && error.code === 11000){
			res.status(400).send({Error:{
				username: "The account name is already in use. Please choose another name."
			}})
		}else {
			res.status(400).send({Error: handleValidationError(error.message)}) 
		}
	}
})

//Log in
router.post('/api/users/login', mongoChecker, async (req, res) => {
	const username = req.body.username
    const password = req.body.password

    try {
		const user = await User.findByUsernamePassword(username, password);
	
		req.session.user ={
			id: user._id,
			username: user.username,
			email: user.email,
			role: user.role
		}
		
		res.send({ currentUser: {
			id: user._id,
			username: user.username,
			email: user.email,
			role:user.role
		}});
    } catch (error) {
    	if (isMongoError(error)) { 
			res.status(500).send({Error: 'Internal server error'});
		} else {
			res.status(400).send({Error: error});
		}
    }
})

//Log out
router.get('/api/users/logout', (req, res) => {
	req.session.destroy((error) => {
		if (error) {
			res.status(500).send(error);
		} else {
			res.send("Log out succefully");
		}
	})
})

//Check if user has logged in 
router.get('/api/users/check-session', (req, res)=>{
    if(req.session.user){
        res.send({currentUser: req.session.user});
    }else{
       res.status(401).send({Error: "user does not exist in session"});
    }
});


//Register a admin
router.post('/api/admins/register', mongoChecker, async (req, res) => {

	const admin = new User({
		_id: new mongoose.Types.ObjectId(),
        username: req.body.username,
		email: req.body.email,
        password: req.body.password,
		role: 'admin',
		image_url: defaultImgURL
    })
    
	try {
        const alreadyExist = await User.exists({email: req.body.email});
		if(alreadyExist){
			res.status(409).send("You have registered.")
		}else{
			const newAdmin = await admin.save()
		    res.send(newAdmin)
        }
	} catch (error) {
		if (isMongoError(error)) { 
			res.status(500).send('Internal server error')
		} else {
			log(error)
			res.status(400).send('Bad Request') 
		}
	}
})

//Get all users
router.get('/api/users/getAll', mongoChecker, authenticate, async (req, res) => {
    try {
        const users = await User.find({role: 'user'})
        res.send({ users }) // can wrap students in object if want to add more properties
    } catch(error) {
        log(error)
        res.status(500).send("Internal Server Error")
    }

})


router.get('/api/users/getimage', mongoChecker, authenticate, async (req, res) => {
	try {
		const curUser = await User.find({
			_id: req.user._id,
		})
		const imageURL = curUser[0].image_url;
		res.send({ imageURL })
	} catch (error) {
		log(error)
		res.status(500).send("Internal Server Error")
	}
})

//Upload image to Cloudinary
function uploadToCloudinary(image) {
	return new Promise((resolve, reject) => {
		cloudinary.uploader.upload(image, (result, err) => {
			if (err) {
				//   console.log("cloudinary error",err);
				return reject(err);
			} else {
				const image_url = result.url; // image url on cloudinary server
				// console.log("cloudinary function:",image);
				return resolve(image_url);
			}

		})
	});
}

//Update the image for user profile photo
router.patch('/api/users/updateImage', mongoChecker, authenticate, multipartMiddleware, async (req, res) => {

	const creator = req.user._id;
	const currentImgUrl = await uploadToCloudinary(req.files.image.path);

	try {
		const curUser = await User.find({
			_id: creator,
		})
		if (curUser) {
			curUser[0].image_url = currentImgUrl; 
			await curUser[0].save();
			res.send({imageURL: currentImgUrl})
		} else {
			console.log("Cannot find user")
			res.status(404).send('Resource not found')
		}
	} catch (error) {
		log(error)
		if (isMongoError(error)) {
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send('Bad Request')
		}
	}
})

//Delete a user
router.delete('/api/users/delete/:id', mongoChecker, authenticate, async (req, res) => {
	const id = req.params.id
	// Validate id immediately.
	if (!ObjectID.isValid(id)) {
		res.status(404).send("Invalid Id")  // if invalid id, definitely can't find resource, 404.
		return;  // so that we don't run the rest of the handler.
    }
	// If id valid, findById
	try {
		const removeUser = await User.deleteOne({_id:id});
		await RoundScore.deleteMany({creator: id});
        res.send(removeUser)
	} catch(error) {
		log(error)
		res.status(500).send('Internal Server Error')  // server error
	}
})



module.exports = router