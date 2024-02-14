const User = require('./models/userModel');
const bcrypt = require('bcrypt');

const router = require('./router');

// Sign up API
router.post('/user/signup', async (req, res) => {
    try {
        const { userName, password, email } = req.body;
        const hashedPassword = bcrypt.hash(password, 10);

        const newUser = new User({
            userName,
            hashedPassword,
            email
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
router.put('/user/update-password', async (req, res) => {
    try {
        const {username} = req.headers;
        const newPassword = req.body;
        const newHashedPW = bcrypt.hash(newPassword, 10);
        await User.update({userName: username}, {password: newHashedPW});

        res.status(201).json({
            message: 'Successfully updated user password'
        });
    } catch(err) {
        return res.status(500).json({error: err.message});
    }
});

// Update email
router.put('/user/update-email', async (req, res) => {
    try {
        const {username} = req.headers;
        const {currentEmail, newEmail} = req.body;
        const user = await User.update({userName: username, email: currentEmail}, {email: newEmail});
        if (!user) {
            res.status(404).json({
                message: 'The user does not exist.',
                user: user.toObject()
            });
        } else {
            res.status(201).json({
                message: 'Successfully updated user email',
                previous_email: currentEmail,
                new_email: newEmail
            });
        }
    } catch(err) {
        return res.status(500).json({error: err.message});
    }
});

// DELETE user account
router.delete('user', async (req, res) => {
    try {
        const {userName, password} = req.headers;
        const user = await User.findOne({userName: userName});

        if (!user) {
            return res.status(401).json({
                message: "User not found",
                error: "User with matching user ID does not exist"
            })
        } 
        const passwordMatch = bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({
                message: "User deletion failed",
                error: "Invalid password"
            })
        }

        await User.deleteById(user.userId);
        res.status(201).send("Successfully deleted the user data.");

        // TODO: Add authorization for ensuring the user is signed in

    } catch(error) {
        return res.status(500).send(error);
    }
});

// Sign in API
router.get('user/signin', async (req, res) => {
    try {
        const { userName, password } = req.headers;
        const user = await User.findOne({ userName: userName});

        if (!user) {
            return res.status(401).json({
                message: "Sign in failed.",
                error: "Invalid Id"
            });
        }
        const passwordMatch = bcrypt.compare(password, user.password);
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

module.exports = userRouter;