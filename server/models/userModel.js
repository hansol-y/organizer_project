require('dotenv').config({path: '../.env'});

const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
            unique: true
        },
        username: { 
            type: String,
            required: true,
            unique: false
        },
        password: { 
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        }
    }
);

module.exports = mongoose.model("User", userSchema, 'userCollection');