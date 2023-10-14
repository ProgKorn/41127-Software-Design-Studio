const express = require('express');
const databaseMaster = require('../DatabaseAccess/databaseMaster');
const ExamStudent = require('../models/examStudentModel.js');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: 'Exam Student' });
});

router.post('/createExamStudent/:studentId/:examId', async (req, res) => {
    try {
      const newExamStudent = new ExamStudent ({ 
        seatNo: 2,
        studentId: parseInt(req.params.studentId), // Jane Doe
        examId: parseInt(req.params.examId), // Maths
        status: "Active",
    });
        await databaseMaster.dbOp('insert', 'FlaggedIncidents', {docs: [newFlag]});
        // const doc = {seatNumber: 1, studentId: parseInt(req.params.studentId), examId: parseInt(req.params.examId), status: "Active"}
        const data = await databaseMaster.dbOp('insert', 'Exam-Student', {docs: [newExamStudent]});
        console.log(data);
        res.json(data); // Send the array of exam student data directly
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
});

module.exports = router;
