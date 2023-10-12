const express = require('express');
const router = express.Router();
const Exam = require('../models/examModel');
const User = require('../models/userModel');
const databaseMaster = require('../DatabaseAccess/databaseMaster')

router.get('/', (req, res) => {
    res.json({ message: 'Student' });
});

router.get('/get/:email', (req,res) => {
  const email = req.params.email;
  databaseMaster.dbOp('find', 'StudentDetails', { query: { email: email } }).then(data => {
    res.json(new User(data[0]));
  });
    });

 router.get('/getExamStudents/:examId', async(req, res) => {
  //get the exam-student entries associated with an exam
  const examId = parseInt(req.params.examId);
  const examStudents = await databaseMaster.dbOp('find', 'Exam-Student', { query: { examId: examId } });

  // iterate through each exam-student entry
  for(const examStudent of examStudents)
  {
    //get studentdetails associated with studentId in examStudent, and add the student name to the examStudent entry
    const studentDetails = await databaseMaster.dbOp('find', 'StudentDetails', { query: { studentId: parseInt(examStudent["studentId"])} }); 
    
    examStudent["name"] = studentDetails[0]["name"]["firstName"] + " " +  studentDetails[0]["name"]["lastName"];
    examStudent["flags"] = examStudent["flags"].length
  }
  
  res.json(examStudents)
  });


module.exports = router;
