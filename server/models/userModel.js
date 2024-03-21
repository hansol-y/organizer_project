require('dotenv').config({path: '../.env'});

const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        userId: { // auto-create
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            index: true,
            auto: true
        },
        userName: { 
            type: String,
            required: true,
            unique: true
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