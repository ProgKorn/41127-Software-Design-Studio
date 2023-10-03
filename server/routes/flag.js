const express = require('express');
const router = express.Router();

const Flag = require('../models/flagModel');
const databaseMaster = require('../DatabaseAccess/databaseMaster');
const { v4: uuidv4 } = require('uuid');

/* 
Example Implementation:

1. Update Flag
const updateObject = { 
    flagId: "ed3a1dad-d9fb-4f19-8438-8308a2bb8e8f", 
    status: "Terminated" 
};

axios.post(url + '/updateFlag', updateObject)
.then((response) => {
    console.log('Flag updated successfully: ', response.data);
})
.catch(error => {
    console.error('Error adding flag: ', error);
});
*/

router.get('/getFlagDetails/:flagId', async (req, res) => { // Get details for a specific flag
    try {
        const flagId = req.params.flagId;
        await databaseMaster.dbOp('find', 'FlaggedIncidents', { query: { flagId: flagId } }).then(data => {
            res.json(new Flag(data[0]));
        });
    } catch (error) {
        // Write up error message here
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/getStudentFlagDetails/:studentId', async (req, res) => { // Get all flagged incidents for a student
    try {
        const studentId = req.params.studentId;
        await databaseMaster.dbOp('find', 'FlaggedIncidents', { query: { studentId: studentId } }).then((data) => {
            const flagObjects = data.map((flagData) => new Flag(flagData));
            res.json(flagObjects);
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/getExamFlagDetails/:examId', async (req, res) => { // Get all flagged incidents for an exam
    try {
        const examId = req.params.examId;
        await databaseMaster.dbOp('find', 'FlaggedIncidents', { query: { examId: examId } }).then(data => {
            const flagObjects = data.map((flagData) => new Flag(flagData));
            res.json(flagObjects);
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/getAllFlags', async (req, res) => { // Find all flags in the collection
    try {
        await databaseMaster.dbOp('find', 'FlaggedIncidents', { query: {} }).then(data => {
            res.json(data);
        });
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

        const newFlag = new Flag ({
            flagId: newFlagId.toString(),
            examId: req.body.params.examId, 
            studentId: req.body.params.studentId,
            status: "Pending",
            description: req.body.flagType,
            sessionName: req.body.params.sessionName,
        });
        const flag = await databaseMaster.dbOp('insert', 'FlaggedIncidents', { docs: [newFlag] });
        console.log("I have raised this flag " + newFlag);
        res.json(flag);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/deleteFlag/:flagId', async (req, res) => { // Delete a flag associated with a specified flagId
    try {
        await databaseMaster.dbOp('delete', 'FlaggedIncidents', { query: { flagId: req.params.flagId } } );
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/updateFlag', async (req, res) => { // Update status from Pending --> Resolved or Terminated
    // Assuming req object will be in the form of { flagId: "test", status: "Resolved" }
    try {
        // Extract flagId and new status from the request body
        const { flagId, status } = req.body;
        const query = { flagId: flagId };
        const docs = { $set: { status: status } };

        // Update the flag in the database by specifying the query criteria and update data
        await databaseMaster.dbOp('update', 'FlaggedIncidents', { query, docs });
        res.json({ message: 'Flag updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;