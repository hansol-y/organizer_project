const { int } = require("blink-detection");
const mongoose = require("mongoose");

const dbUser = process.env.DB_USERNAME;
const dbPass = process.env.DB_PASSWORD;

const connectionString = 'mongodb+srv://${dbUser}${dbPass}@cluster-moodvec.sryz4qe.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(connectionString);

class MoodType {
    static get SAD() {return Symbol("Sad");}
    static get DEPRESSED() {return Symbol("Depressed");}

    constructor(type) {
        if (type !== MoodType.SAD && type != MoodType.DEPRESSED) {
            throw new Error("Invalid Mood Type.");
        }
        this.type = type;
    }
}

const moodSchema = mongoose.Schema(
    {
        mood: {
            type: MoodType,
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
        activeness: {
            type: int,
            required: true
        }
    }
);

module.exports = mongoose.model("Mood", moodSchema);