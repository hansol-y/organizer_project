const express = require('express');

const router = express.Router();

const Mood = require('./models/moodModel');

// TODO: Add user authentication in './middleware'

router.get('/moods', async (req, res) => {
    const userId = req.headers['x-user-id']; // assuming the request get userId using header -> TODO: to be changed when the user authentication is added
    try {
        const result = Mood.find({userId: userId});
        if (result.length === 0) {
            res.status(204).send('No moods found for user %{userId}');
        } else {
            res.status(200).json(result);
        }
    } catch(err) {
        res.status(500).send({error: err});
    }
});

router.get('/moods/${mood}', async (req, res) => {
    
    const userId = req.headers['x-user-id']; // assuming the request get userId using header -> TODO: to be changed when the user authentication is added
    try {
        // TODO: Implement the body to retrieve all the moods with given mood in given period (given as a header)
    } catch(err) {
        res.status(500).send({error: err});
    }
});

router.get('/moods/${date}/${id}', async (req, res) => {
    
    const userId = req.headers['x-user-id']; // assuming the request get userId using header -> TODO: to be changed when the user authentication is added
    try {
        // TODO: Implement the body to retrieve the mood by date and id (getting specific mood record)
    } catch(err) {
        res.status(500).send({error: err});
    }
});

router.post('/moods', async (req, res) => {
    const userId = req.headers['x-user-id'];
    try {
        const { moodType, strength, personal, activeness, date } = req.body;

        if (!date) {
            const today = new Date();
            const year = today.getFullYear();
            const month = today.getMonth();
            const day = today.getDay();
            
            date = year+'-'+month+'-'+day;
        };

        const newMood = new Mood({
            moodType,
            strength,
            personal,
            activeness,
            date
        });

        await newMood.save();

        res.status(201).json("Saved");

    } catch(err) {
        res.status(500).send({error: err});
    }
});

router.put('/moods/%{mood}', async(req, res) => {
    const userId = req.headers['x-user-id'];
    try {

    } catch(err) {
        
    }
});

module.exports = moodRouter;

