const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth');
const ConsumerStrategy = require('passport-http-oauth');

const router = express.Router();

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/login/federated/google', passport.authenticate('google'));

module.exports = authRouter;