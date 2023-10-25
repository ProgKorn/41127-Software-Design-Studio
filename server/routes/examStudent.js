const express = require('express');
const databaseMaster = require('../DatabaseAccess/databaseMaster');
const ExamStudent = require('../models/examStudentModel.js');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: 'Exam Student' });
});

//Post request to create Exam-Students when an Exam Session starts
//SeatNo currently hardcoded - Need to update lines 15 and 50 to be same seat No
router.post('/createExamStudent/:studentId/:examId', async (req, res) => {
    try {
      const newExamStudent = new ExamStudent ({ 
        seatNo: 10,
        examId: req.params.examId, 
        studentId: req.params.studentId, 
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

// Get request for exam sessions 
router.get('/getActiveExamStudent/:studentId/:examId/', async (req, res) => {
  try {
    const examId = parseInt(req.params.examId);
    const studentId = parseInt(req.params.studentId);
    // const seatNo = parseInt(req.params.seatNo);
    const query = {examId: examId, studentId: studentId, status: "Active"}
    const data = await databaseMaster.dbOp('find', 'Exam-Student', { query: query }).then(data => {
      console.log(data)
      res.json(new ExamStudent(data[0]));
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

 // Put request to update status of exam sessions
 router.put('/updateExamStudentStatus/:studentId/:examId', async (req, res) => {
  try {
    const examId = parseInt(req.params.examId);
    const studentId = parseInt(req.params.studentId);
    const query = {examId: examId, studentId: studentId, seatNo: 10}
    const statusUpdate = { $set: { status: req.body.status } };
    const check = await databaseMaster.dbOp('find', 'Exam-Student', { query: query })
    console.log(check)
    console.log(req.body.status)
    const data = await databaseMaster.dbOp('update', 'Exam-Student', { query, docs: statusUpdate }).then(data => {
      res.json("Exam Student Status Updated Successfully");
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
 });

module.exports = router;
