const express = require('express');
const databaseMaster = require('../DatabaseAccess/databaseMaster');
const router = express.Router();
//const Class = require('../models/classModel');

router.get('/get', (req, res) => {
    databaseMaster.dbOp('find', 'ClassDetails', { query: {} }).then(data => {
        /* for(i = 0; i < data.length(); i++)
        {}; */
        res.json(data);
        });
});

module.exports = router;