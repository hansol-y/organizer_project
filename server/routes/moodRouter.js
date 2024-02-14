const express = require('express');

const router = express.Router();

const User = require('./models/userModel');
const Mood = require('./models/moodModel');
const Auth = require('../middleware/auth');

// TODO: Add user authentication using `auth`

// Get all moods of the user
router.get(`/moods`, async (req, res) => {
    const userId = req.headers['userId'];
    try {
        // TODO: authentication
        const user = await User.findOne({userId: userId});
        const result = await Mood.find({user: user});

        if (result.length === 0) {
            res.status(204).send('No moods found for user %{userId}');
        } else {
            res.status(200).json(result);
        }
    } catch(err) {
        res.status(500).send({error: err});
    }
});

// Get the user's all the mood records in given mood 
router.get(`/moods/mood?${mood}`, async (req, res) => {
    // return all the records of given mood
    const userId = req.headers['userId']; // assuming the request get userId using header -> TODO: to be changed when the user authentication is added
    const mood = req.params.mood;
    try {
        const user = await User.findOne({userId: userId});
        const result = await Mood.find({user: user, mood: mood});
        if (result.length === 0) {
            res.status(204).send(`No records found with mood: ${mood}`);
        } else {
            res.status(201).json(result);
        }
    } catch(err) {
        return res.status(500).send({error: err});
    }
});

// Get the user's all the mood records in given date
router.get(`/moods/date?${date}`, async (req, res) => {
    const userId = req.headers['userId'];
    const date = req.params.date;
    try {
        const user = await User.findOne({userId: userId});
        const result = await Mood.find({user: User, date: date});
        if (result.length === 0) {
            res.status(204).send('No moods found for user %{userId}');
        } else {
            res.status(201).json(result);
        }
    } catch(err) {
        return res.status(500).send({error: err});
    }
});

// create a mood record
router.post('/moods', async (req, res) => {
    const userId = req.headers['userId'];
    try {
        const { moodType, strength, personal, activeness, date } = req.body;
        const user = await User.findOne({userId: userId});

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
            date,
            user
        });

        const result = await newMood.save();

        res.status(201).json({
            message: "Saved",
            result: result
        });

    } catch(err) {
        return res.status(500).send({error: err});
    }
});

// Update a mood record
router.put(`/moods/${moodId}`, async(req, res) => {
    const userId = req.headers['userId']; // TODO: use it if required for authentication
    const moodId = req.params.moodId;
    const update = req.body;
    try {
        const result = await Mood.findByIdAndUpdate(moodId, update);
        res.status(201).json(result);
    } catch(err) {
        return res.status(500).json({error: err.message});
    }
});

module.exports = moodRouter;

