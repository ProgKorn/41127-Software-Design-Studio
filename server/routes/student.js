const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const databaseMaster = require('../DatabaseAccess/databaseMaster')

router.get('/', (req, res) => {
    res.json({ message: 'Student' });
});

router.get('/get/:email', (req, res) => {
  const email = req.params.email;
  databaseMaster.dbOp('find', 'StudentDetails', { query: { email: email } }).then(data => {
    res.json(new User(data[0]));
  });
});

router.get('/getExamStudents/:examId', async (req, res) => {
  // get the exam-student entries associated with an exam
  const examId = parseInt(req.params.examId);
  const examStudents = await databaseMaster.dbOp('find', 'Exam-Student', { query: { examId: examId } });

  // iterate through each exam-student entry
  for(const examStudent of examStudents)
  {
    // get student details associated with studentId in examStudent, and add the student name to the examStudent entry
    const studentDetails = await databaseMaster.dbOp('find', 'StudentDetails', { query: { studentId: parseInt(examStudent["studentId"])}}); 
    
    examStudent["name"] = studentDetails[0]["name"]["firstName"] + " " +  studentDetails[0]["name"]["lastName"];
    examStudent["flags"] = examStudent["flags"].length
  }
  
  res.json(examStudents)
});

router.get('/getStudentExams/:studentId', async (req, res) => {
  // get the exam-student entries associated with a student
  const studentId = parseInt(req.params.studentId);
  const examStudents = await databaseMaster.dbOp('find', 'Exam-Student', { query: { studentId: studentId } });

  // iterate through each exam-student entry
  for (const examStudent of examStudents)
  {
    // get exam details associated with studentId in examStudent, and add the student name to the examStudent entry
    const examDetails = await databaseMaster.dbOp('find', 'ExamDetails', { query: { examId: parseInt(examStudent["examId"])}}); 
    
    examStudent["examName"] = examDetails[0]["examName"];
    examStudent["startTime"] = examDetails[0]["startTime"];
    examStudent["endTime"] = examDetails[0]["endTime"];
  }
  
  res.json(examStudents)
});

router.get('/getStudentDetails/:studentId', async (req, res) => {
  try {
    const studentId = req.params.studentId;
    await databaseMaster.dbOp('find', 'StudentDetails', { query: { studentId: parseInt(studentId) } }).then(data => {
      res.json(new User(data[0]));
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
