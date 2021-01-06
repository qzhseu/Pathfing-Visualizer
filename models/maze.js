const mongoose = require('mongoose');

const Maze = mongoose.model('maze',{
    round: {
        type: Number,
        unique: true,
        required: true,
    },
    createdTime:{
        type: String,
        required: true,
        
    },
    modifiedTime:{
        type: String,
        required: true,
        
    },
    encodedMaze:{
        type: String,
        required: true,
    },
    startNode: [Number],
    endNode: [Number]
});

module.exports={ Maze }