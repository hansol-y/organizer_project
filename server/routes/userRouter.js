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

router.put('/user/update-password', async (req, res) => {
    try {
        const {username, password} = req.headers;
        const {currentPassword, newPassword} = req.body;
        User.update({userName: username, password: currentPassword}, {password: newPassword});
        // TODO: deal with the response
    } catch(error) {
    }
});

router.put('/user/update-email', async (req, res) => {
    try {
        const {username, password} = req.headers;
        const {currentEmail, newEmail} = req.body;
        User.update({userName: username, password: password, email: currentEmail}, {email: newEmail});
        // TODO: deal with the response
    } catch(error) {

    }
});

router.delete('user', async (req, res) => {
    try {
        const {userName, password} = req.headers;
        User.deleteOne({userName: userName, password: password});

        if (res.status !== 201) {
            throw new Error();
        }
    } catch(error) {
        
    }
})