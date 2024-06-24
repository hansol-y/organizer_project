require('dotenv').config({path: '../.env'});

const mongoose = require("mongoose");

// const Mood = {
//     happy: "happy/joyful",
//     sad: "sad/low",
//     angry: "angry/irritated",
//     anxious: "anxious/stressed",
//     calm: "calm/relaxed",
//     energetic: "energetic/excited"
// }

const moodSchema = mongoose.Schema(
    {
        mood: {
            type: String,
            enum: ["happy", "sad", "angry", "anxious", "calm", "energetic"],
            required: true
        },
        strength: { // length of the vector
            type: Number,
            required: true
        },
        personal: { // x coord
            type: Number,
            required: true
        },
        activeness: { // y coord
            type: Number,
            required: true
        },
        date: {
            type: Number,
            required: true
        },
        month: {
            type: Number,
            required: true
        },
        year: {
            type: Number,
            required: true
        },
        hour: {
            type:  Number
        },
        minute: {
            type: Number
        },
        second: {
            type: Number
        },
        day: {
            type: Number,
            required: true
        },
        user: {
            type: Object,
            required: true
        }
    }
);

module.exports = mongoose.model("Mood", moodSchema, 'moodCollection');