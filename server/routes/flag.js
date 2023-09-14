const express = require('express');
const router = express.Router();

// const Flag = require('../models/flagModel');

router.get('/', (req, res) => {
    res.json({ message: 'Flag' });
});

module.exports = router;