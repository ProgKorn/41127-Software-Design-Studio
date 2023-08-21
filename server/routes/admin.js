const express = require('express');
const router = express.Router();

// const Admin = require('../models/userModel');

router.get('/', (req, res) => {
    res.json({ message: 'Admin' });
});

module.exports = router;
