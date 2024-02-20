const { int, string } = require("blink-detection");
const mongoose = require("mongoose");

const dbUser = process.env.DB_USERNAME;
const dbPass = process.env.DB_PASSWORD;

const connectionString = `mongodb+srv://${dbUser}${dbPass}@cluster-moodvec.sryz4qe.mongodb.net/moodVec_db?retryWrites=true&w=majority`;

mongoose.connect(connectionString);

const moodSchema = mongoose.Schema(
    {
        mood: {
            type: string,
            required: true
        },
        strength: { // length of the vector
            type: int,
            required: true
        },
        personal: { // x coord
            type: int,
            required: true
        },
        activeness: { // y coord
            type: int,
            required: true
        },
        date: {
            type: string,
            required: true
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId, ref: 'User'
        }
    }
);

module.exports = mongoose.model("Mood", moodSchema, 'moodCollection');