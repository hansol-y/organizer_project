
const express = require("express");
const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const router = express.Router();

const saltRound = 10;

// Sign up API
router.post('/signup', async (req, res) => {
    try {
        const { userName, password, email } = req.body;
        let hashedPassword = await bcrypt.hash(password, saltRound);

        const newUser = new User({
            userName: userName,
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

// Update password
router.put('/update-password', async (req, res) => {
    try {
        const {username} = req.headers;
        const {newPassword} = req.body;
        const newHashedPW = await bcrypt.hash(newPassword, saltRound);
        await User.findOneAndUpdate({ userName: username }, { password: newHashedPW});

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
        const {username} = req.headers;
        const {currentEmail, newEmail} = req.body;
        const user = await User.findOne({ userName: username });

        if (!user) {
            res.status(404).json({
                message: 'The user does not exist.',
                user: user.toObject()
            });
            return res;
        }

        await User.findOneAndUpdate({ userName: username }, { email: newEmail});
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
    try {
        const { userName, password } = req.body;
        const user = await User.findOne({userName: userName});

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

        await User.deleteOne({userId: user.userId});
        res.status(201).send("Successfully deleted the user data.");

        // TODO: Add authorization for ensuring the user is signed in

    } catch(err) {
        return res.status(500).json({error: err.message});
    }
});

// Sign in API
router.get('/signin', async (req, res) => {
    try {
        const { userName, password } = req.body;
        console.log(`Finding user: ${userName}`);
        const user = await User.findOne({ userName: userName});

        if (!user) {
            return res.status(404).json({
                message: "Sign in failed.",
                error: "Invalid Id"
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
        res.status(201).send("Sign in succeeded");
    } catch(err) {
        return res.status(500).json({error: err.message});
    }
});

module.exports = router;