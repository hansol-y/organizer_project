const { int, string } = require("blink-detection");
const mongoose = require("mongoose");

const dbUser = process.env.DB_USERNAME;
const dbPass = process.env.DB_PASSWORD;

const connectionString = `mongodb+srv://${dbUser}${dbPass}@cluster-moodvec.sryz4qe.mongodb.net/moodVec_db?retryWrites=true&w=majority`;

mongoose.connect(connectionString);

// TODO: finalize the mood schema

const userSchema = mongoose.Schema(
    {
        userId: { // auto-create
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            index: true,
            auto: true
        },
        userName: { 
            type: string,
            required: true
        },
        password: { // x coord
            type: string,
            required: true
        },
        email: {
            type: string,
            required: true
        }
    }
);

module.exports = mongoose.model("User", userSchema, 'userCollection');