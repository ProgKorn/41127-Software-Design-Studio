const express = require('express');
const router = express.Router();

const Flag = require('../models/flagModel');
const databaseMaster = require('../DatabaseAccess/databaseMaster');
const { v4: uuidv4 } = require('uuid');

/* 
Example Implementation:
router.get('/', (req, res) => {
    res.json({ message: 'Flag' });
});
*/

router.get('/getFlagDetails', async (req, res) => { // Get details for a specific flag (or filter)
    // Assume req.body will be in the form of { fieldName: %fieldName%, %fieldName%: %value% }
    try {
        const filterName = req.body.fieldName; // "flagId"
        const filterValue = req.body.filterName; // "abcdefg"

        const query = {};
        query[filterName] = filterValue;
        await databaseMaster.dbOp('find', 'FlaggedIncidents', { query: query });
    } catch (error) {
        // Write up error message here
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/getAllFlags', async (req, res) => { // Find all flags in the collection
    try {
        await databaseMaster.dbOp('find', 'FlaggedIncidents');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/addFlag', async (req, res) => { // Add a new flag
    try {
        // Create a new flag instance
        const newFlagId = uuidv4();
        console.log(newFlagId);

        const newFlag = new Flag ({ // Hardcoded student and exam for now
            flagId: newFlagId.toString(),
            examId: 3, // Maths
            studentId: 12345678, // Jane Doe
            status: "Pending",
            description: req.body.flagType,
            sessionName: "Maths Exam Friday 4pm"
        });
        await databaseMaster.dbOp('insert', 'FlaggedIncidents', {docs: [newFlag]});
        console.log("I have raised this flag " + newFlag);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/deleteFlag', async (req, res) => { // Delete a flag associated with a specified flagId
    try {
        await databaseMaster.dbOp('delete', 'FlaggedIncidents', req.body.flagId);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/updateFlag', async (req, res) => { // Update status from Pending --> Resolved or Terminated
    // Assuming req object will be in the form of { flagId: %flagId%, status: "Resolved" }
    try {
        await databaseMaster.dbOp('update','FlaggedIncidents',{docs: []});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;