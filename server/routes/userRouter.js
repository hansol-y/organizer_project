
const express = require("express");
const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const router = express.Router();
const cors = require('cors');

// const jwtAuth = require('../middleware/jwtAuth');
// const JWT_SECRET = process.env.JWT_SECRET;

const saltRound = 10;
const whitelist = ['http://localhost:3000']
const corsOptions = {
    origin: whitelist,
    credentials: true,
    optionSuccessStatus: 200
}

router.use(cors(corsOptions));

// Sign up API
router.post('/signup', async (req, res) => {
    try {
        const { userId, username, password, email } = req.body;
        req.header('Access-Control-Allow-Origin', whitelist.join(", "));
        res.header('Access-Control-Allow-Origin', whitelist.join(", "));
        let hashedPassword = await bcrypt.hash(password, saltRound);

        const newUser = new User({
            userId: userId,
            username: username,
            password: hashedPassword,
            email: email
        });

        await newUser.save();

        res.status(201).json({
            message: 'User saved successfully',
            user: newUser.toObject(), // Convert to plain JavaScript object for response
        });

    } catch(err) {
        return res.status(500).json({error: err.message});
    }
});

// Update username
router.put('/update-username', async (req, res) => {
    try {
        const {userid} = req.headers;
        const {newUsername} = req.body;
        const userWithNewName = await User.findOne({username: newUsername});
        if (userWithNewName) {
            res.status(409).json({
                message: 'The user name already exists. Please choose another one.'
            });
            return res;
        }
        const user = await User.findOne({ userId: userid });
        if (user) {
            await User.findOneAndUpdate({ userId: userid }, { username: newUsername})
        } else {
            res.status(404).json({
                message: 'Cannot find your user data. Please check your user data again'
            })
            return res;
        }

        res.status(201).json({
            message: 'Successfully updated user password'
        });
    } catch(err) {
        return res.status(500).json({error: err.message});
    }
});

// Update password
router.put('/update-password', async (req, res) => {
    try {
        const {userid} = req.headers;
        const {password, newPassword} = req.body;
        const user = await User.findOne({ userId: userid });
        const isCurrentOneMatching = await bcrypt.compare(password, user.password);
        if (isCurrentOneMatching) {
            const newHashedPW = await bcrypt.hash(newPassword, saltRound);
            await User.findOneAndUpdate({ userId: userid }, { password: newHashedPW})
        } else {
            res.status(404).json({
                message: 'Invalid Password. Please check your password again'
            })
            return res;
        }

        res.status(201).json({
            message: 'Successfully updated user password'
        });
    } catch(err) {
        return res.status(500).json({error: err.message});
    }
});

// Update email
router.put('/update-email', async (req, res) => {
    try {
        const {userid} = req.headers;
        const {currentEmail, newEmail} = req.body;
        const user = await User.findOne({ userId: userid });

        if (!user) {
            res.status(404).json({
                message: 'The user does not exist.',
                user: user.toObject()
            });
            return res;
        }

        await User.findOneAndUpdate({ userId: userid }, { email: newEmail});
        res.status(201).json({
            message: 'Successfully updated user email',
            previous_email: currentEmail,
            new_email: newEmail
        });

    } catch(err) {
        return res.status(500).json({error: err.message});
    }
});

// DELETE user account
router.delete('', async (req, res) => {
// router.delete('', jwtAuth, async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({username: username});

        if (!user) {
            return res.status(401).json({
                message: "User not found",
                error: "User with matching user ID does not exist"
            })
        } 
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({
                message: "User deletion failed",
                error: "Invalid password"
            })
        }

        await User.deleteOne({_id: user._id});
        res.status(201).send("Successfully deleted the user data.");

        // TODO: Add authorization for ensuring the user is signed in

    } catch(err) {
        return res.status(500).json({error: err.message});
    }
});

// Sign in API
router.post('/signin', async (req, res) => {
    try {
        const { userId, password } = req.body;
        console.log(`Finding user: ${userId}`);
        const user = await User.findOne({ userId: userId});

        if (!user) {
            return res.status(404).json({
                message: "Sign in failed.",
                error: `Given ID ${userId} does not exist`
            });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({
                message: "Sign in failed",
                error: "Invalid password"
            })
        }
        // TODO: Add authentication

        // const token = jwt.sign({userId}, JWT_SECRET);
        // res.json({token: token});

        return res.status(201).json({message: "Sign in succeeded", user: JSON.stringify(user)});
    } catch(err) {
        return res.status(500).json({error: err.message});
    }
});

module.exports = router;