const express = require('express');

const router = express.Router();

const Mood = require('./models/moodModel');

// TODO: Add user authentication

router.get('/moods', async (req, res) => {
    const userId = req.headers['x-user-id']; // assuming the request get userId using header -> TODO: to be changed when the user authentication is added
    try {
        const result = retrieve(userId);
        if (result.length === 0) {
            res.status(204).send('No moods found for user %{userId}');
        } else {
            res.status(200).json(result);
        }
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

// Retrieve moods with given query parameters 
// TODO: add more parameters based on the added GET requests
async function retrieve(userId) {
    try {
        return await mood.find({userId: userId});
    } catch(err) {
        throw err;
    }
};

module.exports = moodRouter;

