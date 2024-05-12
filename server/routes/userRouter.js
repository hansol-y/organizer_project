
const express = require("express");
const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const router = express.Router();
const cors = require('cors');

const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const saltRound = 10;
const whitelist = ['http://localhost:3000'];
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
        const token = req.headers.authorization;
        const newUsername = req.body;

        jwt.verify(token, JWT_SECRET, async (err, authorizedData) => {
            const existingUserWithNewName = await User.findOne({username: newUsername});
            if (existingUserWithNewName) {
                res.status(409).json({
                    message: 'The user name already exists. Please choose another one.'
                });
                return res;
            }

            if (err) {
                return res.status(403).json({message: "Forbidden to access"});
            }
            const userId = authorizedData.userId;

            const user = await User.findOneAndUpdate({userId: userId}, {username: newUsername});
            if (!user) {
                throw Error("Failed Authorization. Please try sign in again.");
            } else {
                res.status(200).json({message: 'Successfully updated user password'});
            }
        })
    } catch(err) {
        return res.status(500).json({error: err.message});
    }
});

// Update password
router.put('/update-password', async (req, res) => {
    try {
        const token = req.headers.authorization;
        const {password, newPassword} = req.body;

        jwt.verify(token, JWT_SECRET, async (err, authorizedData) => {
            if (err) {
                return res.status(403).json({message: "Forbidden to access"});
            }

            const userId = authorizedData.userId;

            const user = await User.findOne({userId});
            const isPasswordMatching = await bcrypt.compare(password, user.password);
            if (isPasswordMatching) {
                const newHashedPW = await bcrypt.hash(newPassword, saltRound);
                const updatedUser = await User.findOneAndUpdate({userId: userId}, {password: newHashedPW});
                if (updatedUser) {
                    res.status(200).json({
                        message: 'Successfully updated password'
                    });
                } else {
                    throw Error('Failed in Updating process. Please try again.');
                }
            } else {
                res.status(204).json({
                    message: 'Invalid password. Please check your current password again.'
                });
            }
        })
    } catch(err) {
        return res.status(500).json({error: err.message});
    }
});

// Update email
router.put('/update-email', async (req, res) => {
    try {
        const jwtToken = req.headers.authorization;
        const {currentEmail, newEmail} = req.body;

        jwt.verify(jwtToken, JWT_SECRET, async (err, authorizedData) => {
            if (err) {
                return res.status(403).json({message: "Forbidden to access"});
            }
            const userId = authorizedData.userId;
            const user = await User.findOneAndUpdate({userId: userId}, {email: newEmail});

            if (!user) {
                res.status(204).json({
                    message: 'The user does not exist.',
                    user: user.toObject()
                });
                return res;
            }

            res.status(200).json({
                message: 'Successfully updated user email',
                previous_email: currentEmail,
                new_email: newEmail
            });
        })

    } catch(err) {
        return res.status(500).json({error: err.message});
    }
});

// DELETE user account
router.delete('', async (req, res) => {
// router.delete('', jwtAuth, async (req, res) => {
    try {
        const jwtToken = req.headers.authorization;

        jwt.verify(jwtToken, JWT_SECRET, async (err, authorizedData) => {
            if (err) {
                return res.status(403).json({message: "Forbidden to access"});
            }
            const userId = authorizedData.userId;

            const user = await User.findOne({userId: userId});

            if (!user) {
                return res.status(401).json({
                    message: "User not found",
                    error: "User with matching user ID does not exist"
                })
            }

            await User.deleteOne({_id: user._id});
            res.status(204).send("Successfully deleted the user data.");
        })

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

        jwt.sign({userId}, JWT_SECRET, {expiresIn: "1h"}, (err, token) => {
            if (err) {
                return res.status(500).json({message: 'Failed authentication. Please try again'});
            }
            return res.status(201).json({message: "Sign in succeeded", user: JSON.stringify(user), token: token});
        });
        

    } catch(err) {
        return res.status(500).json({error: err.message});
    }
});

module.exports = router;