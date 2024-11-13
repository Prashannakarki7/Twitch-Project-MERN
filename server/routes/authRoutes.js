const express = require('express');
const passport = require('passport');
const router = express.Router();

// Route to start authentication with Twitch
router.get('/twitch', passport.authenticate('twitch'));

// Callback route for Twitch to redirect after authentication
router.get('/twitch/callback', passport.authenticate('twitch', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('http://localhost:5173/profile'); // Redirect to profile page after successful login
    });

module.exports = router;
