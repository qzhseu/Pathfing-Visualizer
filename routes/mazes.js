const log = console.log

const express = require('express');
const router = express.Router();

const { Maze } = require('../models/maze.js')

const { mongoChecker, isMongoError } = require("./helpers/mongo_helpers");
const { authenticate } = require("./helpers/authentication");

// For todays date;
Date.prototype.today = function () { 
    return ((this.getDate() < 10)?"0":"") + this.getDate() +"/"+(((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) +"/"+ this.getFullYear();
}
// For the time now
Date.prototype.timeNow = function () {
    return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
}

//Post route to create the maze
router.post('/api/admit/editMaze/create/:round', mongoChecker, authenticate, async(req, res)=>{
    const round = req.params.round;
    const encodedMaze= req.body.encodedMaze;
    const startNode= req.body.startNode;
    const endNode=req.body.endNode;

    const createdTime=new Date().today()+" "+ new Date().timeNow(); 
    const modifiedTime=new Date().today()+" "+ new Date().timeNow();

    const newMaze=new Maze({
        round: round,
        encodedMaze: encodedMaze,
        startNode:startNode,
        endNode:endNode,
        createdTime: createdTime,
        modifiedTime: modifiedTime
    })

    try{
        const alreadyExist = await Maze.exists({round: round});
        if(!alreadyExist){
            const result=await newMaze.save();
            res.send(result);
        }
    }catch(error){
        log(error)
        if(isMongoError(error)){
            res.status(500).send('Internal server error')
        }else{
            res.status(400).send('Bad Request')
        }
    }
})

//Patch route to update the maze
router.patch('/api/admit/editMaze/update/:round', mongoChecker, authenticate, async(req, res)=>{
    const round = req.params.round;
    const encodedMaze= req.body.encodedMaze;
    const startNode= req.body.startNode;
    const endNode=req.body.endNode;
    const modifiedTime=new Date().today()+" "+new Date().timeNow();

    try{
        const maze = await Maze.find({ round: round })
        if(maze){
            maze[0].encodedMaze = encodedMaze;
            maze[0].modifiedTime= modifiedTime;
            maze[0].startNode=startNode;
            maze[0].endNode=endNode;

            await maze[0].save();
            res.send("Update maze successfully")
        }else{
            console.log("Cannot find Round", round)
            res.status(404).send('Resource not found')  
        }
    }catch(error){
        log(error)
        if(isMongoError(error)){
            res.status(500).send('Internal server error')
        }else{
            res.status(400).send('Bad Request')
        }
    }
})

//Get route to get a maze
router.get('/api/admit/editMaze/get/:round', mongoChecker,  async(req, res)=>{
    const round = req.params.round;
    try{
        const maze = await Maze.find({ round: round });
        res.send({maze});
    }catch(error){
        log(error)
        res.status(500).send("Internal Server Error")
    }
})

//Get route to get all mazes
router.get('/api/admit/editMaze/getAllMazes', mongoChecker, async(req, res)=>{
    try{
        const maze = await Maze.find({});
        res.send({maze});
    }catch(error){
        log(error)
        res.status(500).send("Internal Server Error")
    }
})

router.patch('/api/admit/editMaze/clear/:round', mongoChecker, authenticate, async(req, res)=>{
    const round = req.params.round;
    const encodedMaze= req.body.encodedMaze;
    const startNode= req.body.startNode;
    const endNode=req.body.endNode;

    try{
        const clearMaze=await Maze.find({round: round});
        clearMaze[0].encodedMaze=encodedMaze;
        clearMaze[0].startNode=startNode;
        clearMaze[0].endNode=endNode;
        await clearMaze[0].save();
        res.send("Reset Maze successfully");
    }catch(error) {
		log(error)
		res.status(500).send('Internal Server Error')  
	}
})

//Delete route to delete the maze
router.delete('/api/admit/editMaze/delete/:round', mongoChecker, authenticate, async(req, res)=>{
    const round = req.params.round;
	try {
        const removeMaze = await Maze.deleteOne({round : round});
        res.send(removeMaze)
	} catch(error) {
		log(error)
		res.status(500).send('Internal Server Error')  
	}
})

module.exports = router