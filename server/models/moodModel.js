require('dotenv').config({path: '../.env'});

const mongoose = require("mongoose");

const moodSchema = mongoose.Schema(
    {
        mood: {
            type: String,
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
            type: String,
            required: true
        },
        _id: {
            type: mongoose.Schema.Types.ObjectId, ref: 'User'
        }
    }
);

module.exports = mongoose.model("Mood", moodSchema, 'moodCollection');