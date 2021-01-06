"use strict";
const log = console.log;

const express = require("express");
const app = express();
const path = require('path');

const { mongoose } = require("./db/mongoose");

mongoose.set('useFindAndModify', false);

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const session = require('express-session');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: 'our hardcoded secret', 
    saveUninitialized: false, 
    resave: false, 
    cookie: { 
        expires: 3600000, 
        httpOnly: true 
    },
}));

app.use(express.static(path.join(__dirname, "./client/build")));


app.use(require('./routes/users'));
app.use(require('./routes/roundScores'));
app.use(require('./routes/mazes'));
app.use(require('./routes/webpages'));


const port = process.env.PORT || 3000
app.listen(port, () => {
	log(`Listening on port ${port}...`)
}) 
