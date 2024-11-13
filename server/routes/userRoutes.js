const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

router.get('/get-user-info', (req, res) => {
    if (req.isAuthenticated()) {
        return res.json(req.user);
    } else {
        return res.status(401).json({ message: 'User not authenticated' });
    }
});

module.exports = router;
