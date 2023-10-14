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
        studentId: parseInt(req.params.studentId), 
        examId: parseInt(req.params.examId), 
        status: "Active"
    });
        const result = await databaseMaster.dbOp('insert', 'Exam-Student', {docs: [newExamStudent]});
          console.log("Exam Student created:" + newExamStudent);
          res.status(201).json(result); // Return the created exam student data

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/getExamStudent/:examId', async (req, res) => {
  try {
    const examId = parseInt(req.params.examId);
    const data = await databaseMaster.dbOp('find', 'Exam-Student', { query: {examId : examId} }).then(data => {
      res.json(new ExamStudent(data[0]));
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
 });

module.exports = router;
