const express = require('express');
const router = express.Router();

// const User = require('../models/userModel');

router.get('/', (req, res) => {
    res.json({ message: 'Login' });
});

module.exports = router;
