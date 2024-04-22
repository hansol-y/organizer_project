const express = require('express');

const router = express.Router();

const User = require('../models/userModel');
const Mood = require('../models/moodModel');
const Auth = require('../middleware/auth');

// TODO: Add user authentication using `auth`

// Get all moods of the user
router.get('', async (req, res) => {
    const userId = req.headers['userid'];
    try {
        // TODO: authentication
        const user = await User.findOne({userId: userId});
        const result = await Mood.find({user: user});

        if (result.length === 0) {
            res.status(204).send(`No moods found for user ${user.userId}`);
        } else {
            res.status(200).json(result);
        }
    } catch(err) {
        res.status(500).send({error: err});
    }
});

// Get the user's all the mood records in given mood 
router.get('/mood/:mood', async (req, res) => {
    // return all the records of given mood
    const _id = req.headers['_id']; // assuming the request get _id using header -> TODO: to be changed when the user authentication is added
    const mood = req.params.mood;
    try {
        const user = await User.findOne({_id: _id});
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
router.get('/date/:date', async (req, res) => {
    const userid = req.body['userid'];
    const date = req.params;
    try {
        const user = await User.findOne({userId: userid});
        const result = await Mood.find({userId: userid, date: date});
        if (result.length === 0) {
            res.status(204).send(`No moods found for user ${user.userId}`);
        } else {
            res.status(201).json(result);
        }
    } catch(err) {
        return res.status(500).send({error: err});
    }
});

// Get the user's all the mood records in given month
router.get('/date/:month/:year', async (req, res) => {
    const userid = req.body['userid'];
    const month = req.params.month;

    try {
        const user = await User.findOne({userId: userid});
        const result = await Mood.find({user: user, month: month, year: year});
        if (result.length === 0) {
            res.status(204).send(`No moods found for user ${user.userId}`);
        } else {
            res.status(201).json(result);
        }
    } catch(err) {
        return res.status(500).send({error: err});
    }
});

// create a mood record
router.post('', async (req, res) => {
    const userid = req.headers['userid'];
    try {
        let { mood, strength, personal, activeness, date, year, month } = req.body;
        const user = await User.findOne({userId: userid});

        if (!date || !month || !year) {
            const today = new Date();
            year = today.getFullYear();
            month = today.getMonth();
            date = today;
        };

        const newMood = new Mood({
            mood: mood,
            strength: strength,
            personal: personal,
            activeness: activeness,
            date: date,
            month: month,
            year: year,
            user: user
        });

        const result = await newMood.save();

        res.status(201).json({
            message: "Saved",
            result: result
        });

    } catch(error) {
        return res.status(500).send({error: error.message});
    }
});

// Update a mood record
router.put('', async(req, res) => {

    const userid = req.headers['userid']; // TODO: use it if required for authentication
    const moodId = req.headers['_id'];
    const updateBody = JSON.parse(JSON.stringify(req.body));
    const update = {
        "$set": updateBody
    };

    try {
        await Mood.findByIdAndUpdate({_id: moodId}, update);
        res.status(201).json(`Successfully updated mood ${moodId}`);
    } catch(err) {
        return res.status(500).json({error: err.message});
    }
});

router.delete('', async(req, res) => {
    const moodId = req.headers['_id'];
    const userid = req.headers['userid'];

    try {
        await Mood.deleteOne({_id: moodId});
        res.status(201).json(`Successfully deleted mood ${moodId}`);
    } catch(error) {
        return res.status(500).json({error: error.message});
    }
})

module.exports = router;

