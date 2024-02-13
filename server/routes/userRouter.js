const User = require('./models/userModel');
const router = require('./router');

router.post('/user/signup', async (req, res) => {
    try {
        const { userName, password, email } = req.body;

        const newUser = new User({
            userName,
            password,
            email
        });

        await newUser.save();

        res.status(201).json({
            message: 'User saved successfully',
            user: newUser.toObject(), // Convert to plain JavaScript object for response
        });
        // TODO: deal with the response

    } catch(err) {
        return res.status(500).json({error: err.message});
    }
});

router.put('/user/update-password', async (req, res) => {
    try {
        const {username, password} = req.headers;
        const {currentPassword, newPassword} = req.body;
        await User.update({userName: username, password: currentPassword}, {password: newPassword});

        res.status(201).json({
            message: 'Successfully updated user password'
        });
    } catch(err) {
        return res.status(500).json({error: err.message});
    }
});

router.put('/user/update-email', async (req, res) => {
    try {
        const {username, password} = req.headers;
        const {currentEmail, newEmail} = req.body;
        const user = await User.update({userName: username, password: password, email: currentEmail}, {email: newEmail});
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

router.delete('user', async (req, res) => {
    try {
        const {userName, password} = req.headers;
        const user = await User.findOne({userName: userName, password: password});

        if (!user) {
            res.status(404).send("The user data does not exist.")
        } else {
            await User.deleteOne({userName: userName, password: password});
            res.status(201).send("Successfully deleted the user data.");
        }
    } catch(error) {
        return res.status(500).send(error);
    }
});

router.get('user/login', async (req, res) => {
    try {
        const { userId, password } = req.headers;
        const user = await User.findOne({ userId: userId, password: password });

        if (!user) {
            res.status(404).json({
                message: "Cannot find the user. Please check your id and password"
            });
        } else {
            res.status(201).json({
                message: "Successfully logged in",
                user: user.toObject()
            });
        }
    } catch(err) {
        return res.status(500).json({error: err.message});
    }
});

module.exports = userRouter;