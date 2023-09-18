const express = require('express');
const router = express.Router();

const Flag = require('../models/flagModel');
const databaseMaster = require('../DatabaseAccess/databaseMaster');

/* 
Example Implementation:
router.get('/', (req, res) => {
    res.json({ message: 'Flag' });
});
*/

router.get('/getFlagDetails', (req, res) => { // Get details for a specific flag
    try {
        // Find singular flag from DB corresponding with a flagId
    } catch (error) {
        // Write up error message here
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/getAllFlags', (req, res) => { // Find all flags in the collection
    try {
        // fetch all documents in the FlaggedIncidents collection --> potentially add filter for student and/or class
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/addFlag', (req, res) => { // Add a new flag
    try {
        databaseMaster.dbOp('insert-flag', req); // double check req object params
        // continue functionality here
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/deleteFlag', (req, res) => { // Delete a flag
    try {
        // 
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/updateFlag', (req, res) => { // Update status from Pending --> Approved or Pending --> Rejected
    try {
        // 
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;