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
        seatNo: 50,
        examId: req.params.examId, 
        studentId: req.params.studentId, 
        status: "Active"
    });
      // const findExamStudent = databaseMaster.dbOp('find', 'Exam-Student', {docs: [newExamStudent]})
      // console.log("Does Exam Student Exist: " + findExamStudent)
      // if (findExamStudent) {
        const result = await databaseMaster.dbOp('insert', 'Exam-Student', {docs: [newExamStudent]});
        console.log("Exam Student created:" + newExamStudent);
        res.status(201).json(result); // Return the created exam student data
      // }

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get request for exam sessions 
router.get('/getExamStudent/:studentId/:examId', async (req, res) => {
  try {
    const examId = parseInt(req.params.examId);
    const studentId = parseInt(req.params.studentId);
    const data = await databaseMaster.dbOp('find', 'Exam-Student', { query: {examId : examId} }).then(data => {
      res.json(new ExamStudent(data[0]));
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
 });

 // Patch request to update status of exam sessions
 router.patch('/updateExamStudentStatus/:studentId/:examId', async (req, res) => {
  try {
    const examId = parseInt(req.params.examId);
    const studentId = parseInt(req.params.studentId);
    const examStudent = {examId: examId, studentId: studentId}
    const statusUpdate = { $set: { status: req.body.status } };

    const data = await databaseMaster.dbOp('update', 'Exam-Student', { examStudent, statusUpdate }).then(data => {
      res.json(new ExamStudent(data[0]));
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
 });

module.exports = router;
