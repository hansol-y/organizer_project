const User = require('./models/userModel');
const router = require('./router');

router.post('/user', async (req, res) => {
    try {
        const { userName, password, email } = req.body;

        const newUser = new User({
            userName,
            password,
            email
        });

        await newUser.save();

        res.status(201).json("Saved");

    } catch(err) {
        res.status(500).send({error: err});
    }
});

router.put(`/user/{$password}`, async (req, res) => {
    // TODO: Update password + update user email as next put API
})