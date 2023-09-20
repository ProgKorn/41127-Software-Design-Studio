const express = require('express');
const databaseMaster = require('../DatabaseAccess/databaseMaster');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: 'Exam Student' });
});

router.post('/createExamStudent', async (req, res) => {
    try {
        //const data = await databaseMaster.dbOp('insert', 'Exam-Student', {}); This will be actual - need to get exam id and student id somehow
        const doc = {seatNumber: 1, studentId: req.body.studentId, examId: req.body.examId, status: "Active"}
        const data = await databaseMaster.dbOp('insert', 'Exam-Student', {docs: doc});
        console.log(data);
        res.json(data); // Send the array of exam student data directly
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
});

module.exports = router;
