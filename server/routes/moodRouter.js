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
router.get(`/mood`, async (req, res) => {
    // return all the records of given mood
    const userid = req.headers['userid']; // assuming the request get _id using header -> TODO: to be changed when the user authentication is added
    const mood = req.params.mood;
    try {
        const user = await User.findOne({userId: userid});
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
router.get('/date', async (req, res) => {
    const userid = req.headers['userid'];
    const { date } = req.query;
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const dateInNum = dateObj.getDate();
    try {
        const user = await User.findOne({userId: userid});
        console.log(user);
        if (!user) {
            res.status(404).send(`Your user data is not found. Please check your ID again`);
            return res;
        }
        const result = await Mood.find({date: dateInNum, month: month, year: year, user: user});
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
router.get('/month', async (req, res) => {
    const userid = req.headers['userid'];
    const {month, year} = req.query;

    try {
        const user = await User.findOne({userId: userid});
        const result = await Mood.find({user: user, month: parseInt(month), year: parseInt(year)});
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
        let { mood, strength, personal, activeness, date, year, month, hour, minute, second } = req.body;
        const user = await User.findOne({userId: userid});

        const now = new Date();

        const dateToStore = !(date) ? now.getDate() : date;
        const monthToStore = !(month) ? now.getMonth() + 1 : month;
        const yearToStore = !(year) ? now.getFullYear() : year;
        const hourToStore = !(hour) ? now.getHours() : hour;
        const minToStore = !(minute) ? now.getMinutes() : minute;
        const secToStore = !(second) ? now.getSeconds() : second;
 
        const newMood = new Mood({
            mood: mood,
            strength: strength,
            personal: personal,
            activeness: activeness,
            date: dateToStore,
            month: monthToStore,
            year: yearToStore,
            hour: hourToStore,
            minute: minToStore,
            second: secToStore,
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

