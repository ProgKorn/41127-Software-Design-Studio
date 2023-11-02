const express = require('express');
const databaseMaster = require('../DatabaseAccess/databaseMaster');
const ExamStudent = require('../models/examStudentModel.js');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: 'Exam Student' });
});

//TODO: Get associated seat No and remove Hardcoding

//Post request to create Exam-Students when an Exam Session starts
router.post('/createExamStudent/:studentId/:examId/:seatNo', async (req, res) => {
    try {
      const newExamStudent = new ExamStudent ({ 
        seatNo: req.params.seatNo,
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
router.get('/getActiveExamStudent/:studentId/:examId', async (req, res) => {
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
 router.put('/updateExamStudentStatus/:studentId/:examId/:seatNo', async (req, res) => {
  try {
    const examId = parseInt(req.params.examId);
    const studentId = parseInt(req.params.studentId);
    const seatNo = parseInt(req.params.seatNo);
    const query = {examId: examId, studentId: studentId, seatNo: seatNo}
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

  // Put request to add flagid to flags array of exam student
  router.put('/addFlag/:studentId/:examId/:flagId', async (req, res) => {
    try {
      const examId = parseInt(req.params.examId);
      const studentId = parseInt(req.params.studentId);
      const flagId = parseInt(req.params.flagId);
      const query = {examId: examId, studentId: studentId, seatNo: 21}

      // Add the flag to the flags array
      const flagUpdate = { $push: { flags: flagId } }; 

      // Update the exam-student document with the new flag
      const updateResult = await databaseMaster.dbOp('update', 'Exam-Student', { query, docs: flagUpdate }).then(data => {
        res.json("Flag ID added successfully");
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
   });

module.exports = router;
