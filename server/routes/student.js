const express = require('express');
const router = express.Router();

// const Student = require('../models/userModel');

router.get('/', (req, res) => {
    res.json({ message: 'Student' });
});

module.exports = router;
