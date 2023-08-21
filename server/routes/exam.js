const express = require('express');
const router = express.Router();

// const Exam = require('../models/examModel');

router.get('/', (req, res) => {
    res.json({ message: 'Exam' });
});

module.exports = router;
