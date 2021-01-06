const log = console.log

const express = require('express');
const router = express.Router();

const { RoundScore } = require('../models/score')

const { mongoChecker, isMongoError } = require("./helpers/mongo_helpers");
const { authenticate } = require("./helpers/authentication");
const { secondsToFormat } =require("./helpers/parseTime");

//Post route to create the result of a round 
router.post('/api/game/initRoundScore', mongoChecker, authenticate, async(req, res)=>{
    const round=req.body.round;
    const bestScore=req.body.bestScore;
    const bestTime=req.body.bestTime;
    const times=req.body.times;
    const totalTime=req.body.totalTime;
    const creator=req.user._id;

    const roundScore=new RoundScore({
        round: round,
        bestScore : bestScore,
        bestTime : bestTime,
        times: times,
        totalTime: totalTime,
        creator: creator
    })

    try{
        const alreadyExist = await RoundScore.exists({round: round, creator:creator});
        if(!alreadyExist){
            const result=await roundScore.save();
            res.send(result)
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

//Update round score
router.patch('/api/game/updateRoundScore', mongoChecker, authenticate, async(req, res)=>{
    const round=req.body.round;
    const currentScore=req.body.currentScore;
    const pass=req.body.pass;
    const time=req.body.time;
    const creator=req.user._id;

    try{
        const roundScore = await RoundScore.find({
			creator:creator,
			round: round
        })
        if(roundScore){
            roundScore[0].bestScore= pass ? (roundScore[0].bestScore >0 ? Math.max(roundScore[0].bestScore, currentScore) : currentScore) : roundScore[0].bestScore;
            roundScore[0].bestTime= pass ? (roundScore[0].bestTime > 0 ? Math.min(roundScore[0].bestTime, time) : time) : roundScore[0].bestTime;
            roundScore[0].times=roundScore[0].times+1;
            roundScore[0].totalTime=roundScore[0].totalTime+time;

            await roundScore[0].save();
            res.send("Update score successfully")

        }else{
            console.log("Cannot find Round", round)
            res.status(404).send({Error: 'Resource not found'})  
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

//Get all score
router.get('/api/roundScores', mongoChecker, authenticate, async (req, res)=>{
    try{
        const roundScores = await RoundScore.find({
            creator: req.user._id,
            bestScore: { $gte: 0 },
            bestTime: { $gte: 0 }
        })
        res.send({roundScores})
    }catch(error){
        log(error)
        res.status(500).send("Internal Server Error")
    }
})

//Update all users's scores for a round
router.get('/api/roundScores/reset/:round', mongoChecker, authenticate, async(req, res)=>{
    const round = req.params.round;
    try{
        const allScores = await RoundScore.find({round: round});
        for(const score of allScores){
            score.bestTime=-1;
            score.bestScore=-1;
            score.times=0;
            score.totalTime=0;
            await score.save();
        }
        res.send("Reset successfully!")
    }catch(error){
        log(error)
        if(isMongoError(error)){
            res.status(500).send('Internal server error')
        }else{
            res.status(400).send('Bad Request')
        }
    }
})


//Get all users' scores for a round
router.get('/api/roundScores/:round', mongoChecker,  async (req, res)=>{
    const round = req.params.round;
    try{ 
        await RoundScore.find({ 
            round: round, 
            bestScore: { $gte: 0 },
            bestTime: { $gte: 0 }
        })
        .populate('creator')
        .exec(function (error, foundRound) {
            if(error) res.send(error);
            const userList=[];
            if(foundRound){
                foundRound.forEach(function(round){
                    userList.push({
                        username: round.creator.username,
                        imgURL: round.creator.image_url,
                        time: secondsToFormat(round.bestTime),
                        score: round.bestScore
                    });
                })
            }
            res.send(userList)
        })       
    }catch(error){
        log(error)
        res.status(500).send("Internal Server Error")
    }
})


module.exports = router
