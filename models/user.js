'use strict';

const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
	_id: Schema.Types.ObjectId,
    username:{
        type: String,
        required: [true,'Username is required'],
        unique: true,
        minlength: 1,
    },
	email: {
		type: String,
		required: [true,"Email is required"],
		minlength: 1,
        trim: true,
        unique: true,
		validate: {
			validator: validator.isEmail, 
			message: 'Not valid email'
		}
	}, 
	password: {
		type: String,
		required: [true,"Password is required"],
		minlength: 4
    },
    role: {
        type: String,
        required: true,
	},
	image_url: {
		type: String,
		required: true
	},
	roundScores: [{ type: Schema.Types.ObjectId, ref: 'RoundScore' }]
})

UserSchema.pre('save', function(next) {
	const user = this; 
	if (user.isModified('password')) {
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(user.password, salt, (err, hash) => {
				user.password = hash
				next()
			})
		})
	} else {
		next()
	}
})

UserSchema.statics.findByUsernamePassword = function(username, password) {
	const User = this 
	return User.findOne({ username: username }).then((user) => {
		if (!user) {
			return Promise.reject({
                username: 'Email or password is incorrect'
            }) 
		}
		
		return new Promise((resolve, reject) => {
			bcrypt.compare(password, user.password, (err, result) => {
				if (result) {
					resolve(user)
				} else {
					reject({
						username: 'Email or password is incorrect'
					})
				}
			})
		})
	})
}

const User = mongoose.model('User', UserSchema)
module.exports = { User }

