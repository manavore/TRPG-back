/**
 * @fileoverview Entrypoint of this app
 * @author Póvoa Tiago
 */

const express = require("express");
const app = express();

const cors = require("cors");
const mongoose = require('mongoose'); 

/**
 * Db section
 */
// Warning, hardcoded IP, todo change it
const uri = 'mongodb://172.17.0.2/test';

mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connection successful');
});

/**
 * Middleware section
 */
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cors());

/**
 * Routes section
 */
const dice =        require('./routes/dice');
const characters =  require('./routes/characters');
const stories =     require('./routes/stories');

app.use('/api/dice', dice);
app.use('/api/characters', characters);
app.use('/api/stories', stories);


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is listening on port: ${port}`));