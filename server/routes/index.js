const express = require('express');
const AuthRoutes = require('./authRoutes');
const UserRoutes = require('./userRoutes');

const router = express.Router();

// Set up routes
router.use('/auth', AuthRoutes);
router.use('/user', UserRoutes);

module.exports = router;