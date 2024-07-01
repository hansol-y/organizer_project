const express = require('express');

const router = express.Router();

const User = require('../models/userModel');
const Mood = require('../models/moodModel');

const cors = require('cors');

const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const whitelist = ['http://localhost:3000'];
const corsOptions = {
    origin: whitelist,
    credentials: true,
    optionSuccessStatus: 200
}

router.use(cors(corsOptions));

// Get all moods of the user
router.get('', async (req, res) => {
    const token = req.headers.authorization;
    try {
        jwt.verify(token, JWT_SECRET, async (err, authorizedData) => {
            if (err) {
                return res.status(403).json({message: "Forbidden to access"});
            }
            const userId = authorizedData.userId;
            const user = await User.findOne({userId: userId});
            const result = await Mood.find({user: user});

            if (result.length === 0) {
                res.status(204).send(`No moods found for user ${user.userId}`);
            } else {
                res.status(200).json(result);
            }
        })
    } catch(err) {
        res.status(500).send({error: err});
    }
});

// Get the user's all the mood records in given mood 
router.get(`/mood`, async (req, res) => {
    // return all the records of given mood
    const token = req.headers.authorization;
    // const userid = req.headers['userid']; // assuming the request get _id using header -> TODO: to be changed when the user authentication is added
    const mood = req.params.mood;
    try {
        jwt.verify(token, JWT_SECRET, async (err, authorizedData) => {
            if (err) {
                return res.status(403).json({message: "Forbidden to access"});
            }
            const userId = authorizedData.userId;
            const user = await User.findOne({userId: userId});
            const result = await Mood.find({user: user, mood: mood});

            if (result.length === 0) {
                res.status(204).json(`No records found with mood: ${mood}`);
            } else {
                res.status(201).json(result);
            }
        })
    } catch(err) {
        return res.status(500).send({error: err});
    }
});

// Get all moods of the user in last 6 months
router.get('/last-six-month', async (req, res) => {
    const token = req.headers.authorization;
    try {
        jwt.verify(token, JWT_SECRET, async (err, authorizedData) => {
            if (err) {
                return res.status(403).json({message: "Forbidden to access"});
            }
            const userId = authorizedData.userId;
            const user = await User.findOne({userId: userId});
            let result = [];
            
            const today = new Date();
            let month = today.getMonth() + 1;
            let year = today.getFullYear();
            for (let i = 0; i < 6; i++) {
                console.log(`Getting mood data of ${year}/${month}`)
                const curr = await Mood.find({user: user, month: month, year: year});
                result = result.concat(curr);

                if (month > 1) {
                    month -= 1;
                } else {
                    month = 12;
                    year -= 1;
                }
            }

            if (result.length === 0) {
                res.status(204).send(`No moods found for user ${user.userId} in last 6 months`);
            } else {
                res.status(200).json(result);
            }
        })
    } catch(err) {
        res.status(500).send({error: err});
    }
});

// Get the user's all the mood records in given date
router.get('/date', async (req, res) => {
    // const userid = req.headers['userid'];
    const { date, month, year } = req.query;
    const token = req.headers.authorization;
    try {
        jwt.verify(token, JWT_SECRET, async (err, authorizedData) => {
            if (err) {
                return res.status(403).json({message: "Forbidden to access"});
            }
            const userId = authorizedData.userId;
            const user = await User.findOne({userId: userId});
            const result = await Mood.find({user: user, date: date, month: month, year: year});

            if (result.length === 0) {
                res.status(204).json(`No moods found for the given period`);
            } else {
                res.status(201).json(result);
            }
        })
    } catch(err) {
        return res.status(500).send({error: err});
    }
});

// Get the user's all the mood records in given month
router.get('/month', async (req, res) => {
    const token = req.headers.authorization;
    // const userid = req.headers['userid']; // assuming the request get _id using header -> TODO: to be changed when the user authentication is added
    const {month, year} = req.query;
    try {
        jwt.verify(token, JWT_SECRET, async (err, authorizedData) => {
            if (err) {
                return res.status(403).json({message: "Forbidden to access"});
            }
            const userId = authorizedData.userId;
            const user = await User.findOne({userId: userId});
            const result = await Mood.find({user: user, month: parseInt(month), year: parseInt(year)});

            if (result.length === 0) {
                res.status(204).json(`No records found for the given period`);
            } else {
                res.status(201).json(result);
            }
        })
    } catch(err) {
        return res.status(500).send({error: err});
    }
});

// create a mood record
router.post('', async (req, res) => {
    const token = req.headers.authorization;
    try {
        console.log(req.body);
        let { mood, strength, personal, activeness, date, year, month, hour, minute, second, day } = req.body;

        jwt.verify(token, JWT_SECRET, async (err, authorizedData) => {
            if (err) {
                return res.status(403).json({message: "Forbidden to access"});
            }
            const userId = authorizedData.userId;
            const user = await User.findOne({userId: userId});

            const now = new Date();

            const dateToStore = !(date) ? now.getDate() : date;
            const monthToStore = !(month) ? now.getMonth() + 1 : month;
            const yearToStore = !(year) ? now.getFullYear() : year;
            const hourToStore = !(hour) ? now.getHours() : hour;
            const minToStore = !(minute) ? now.getMinutes() : minute;
            const secToStore = !(second) ? now.getSeconds() : second;
            const dayToStore = !(day) ? now.getDay() : day;
            console.log(dayToStore);
            console.log(now.getDay());

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
                day: dayToStore,
                user: user
            });

            const result = await newMood.save();

            res.status(201).json({
                message: "Saved",
                result: result
            });
        })
    } catch(error) {
        return res.status(500).send({error: error.message});
    }
});

// Update a mood record
router.put('', async(req, res) => {

    const token = req.headers.authorization;
    const moodId = req.headers.moodId;
    // const updateBody = JSON.parse(JSON.stringify(req.body));
    const updateBody = req.body;
    const update = {
        "$set": updateBody
    };

    try {
        jwt.verify(token, JWT_SECRET, async (err, authorizedData) => {
            if (err) {
                return res.status(403).json({message: "Forbidden to access"});
            }
            const userId = authorizedData.userId;
            const updatedMood = await Mood.findByIdAndUpdate({_id: moodId}, update);
            if (updatedMood & userId === updatedMood.user.userId) {
                res.status(200).json(`Successfully updated mood ${moodId}`);
            } else {
                throw Error("Failed updating the mood. Please try again.");
            }
        })
    } catch(err) {
        return res.status(500).json({error: err.message});
    }
});

router.delete('', async(req, res) => {
    const moodId = req.headers.moodId;
    const token = req.headers.authorization;

    try {
        const mood = await Mood.findOne({_id: moodId});
        jwt.verify(token, JWT_SECRET, async (err, authorizedData) => {
            if (err) {
                return res.status(403).json({message: "Forbidden to access"});
            }
            const userId = authorizedData.userId;
            if (mood.user.userId !== userId) {
                return res.status(401).json("Found mood does not match with your record. Please check the mood Id");
            } else {
                await Mood.deleteOne({_id: moodId});
                res.status(204).json(`Successfully deleted mood ${moodId}`);
            }
        })
    } catch(error) {
        return res.status(500).json({error: error.message});
    }
})

module.exports = router;

