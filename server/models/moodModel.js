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
        user: {
            type: Object,
            required: true
        }
    }
);

module.exports = mongoose.model("Mood", moodSchema, 'moodCollection');