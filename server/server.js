require('dotenv').config({path: '../.env'});

var express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var app = express();
const PORT = process.env.BACKEND_PORT || 8000;

const dbUser = process.env.DB_USERNAME;
const dbPass = process.env.DB_PASSWORD;

const userRouter = require('./routes/userRouter');
const moodRouter = require('./routes/moodRouter');

const connectionString = `mongodb+srv://${dbUser}:${dbPass}@cluster-moodvec.sryz4qe.mongodb.net/moodVec_db?retryWrites=true&w=majority`;

mongoose.connect(connectionString).then(() => {
    console.log('Connected to MongoDB: moodVec_db');
}).catch((err) => {
    console.error('Failed to connect to MongoDB: ', err);
});

app.use(bodyParser.json());
app.use('/api/user', userRouter);
app.use('/api/mood', moodRouter);


app.listen(PORT, () => {
    console.log(`Running the server on port ${PORT}`);
})