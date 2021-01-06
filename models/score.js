const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoundScore = mongoose.model('RoundScore',{
    round: {
        type: Number,
        required: true,
    },
    bestScore:{
        type: Number,
        required: true,
    },
    bestTime:{
        type: Number,
        required: true,
    },
    times:{
        type: Number,
        required: true,
    },
    totalTime:{
        type: Number,
        required: true,
    },
    creator: { 
        type: Schema.Types.ObjectId, 
        ref: 'User' 
    },
});

module.exports={ RoundScore }