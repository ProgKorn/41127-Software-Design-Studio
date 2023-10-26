const express = require('express');
const databaseMaster = require('../DatabaseAccess/databaseMaster');
const router = express.Router();
const Exam = require('../models/examModel');

router.get('/', (req, res) => {
    res.json({ message: 'Exam' });
});

router.get('/getExamDetails/:examId', async (req, res) => {
  try {
    const examId = parseInt(req.params.examId);
    const data = await databaseMaster.dbOp('find', 'ExamDetails', { query: {examId : examId} }).then(data => {
      res.json(new Exam(data[0]));
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
 });
 //     if (data) {
//       console.log(data);
//       res.json(data); // Send the exam details as a JSON response
//     } else {
//       res.status(404).json({ error: 'Exam not found' });
//     }

router.get('/getExamDetails/:examId', async (req, res) => {
  try {
    const examId = parseInt(req.params.examId);
    //returns the exam details associated with the examId parameter
    const data = await databaseMaster.dbOp('find', 'ExamDetails', { query: {examId: examId} });
    console.log(data);
    res.json(data[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.post('/addExam', async (req, res) => { // Add a new exam and update the chosen class with exam 
  try {
    
      // Randomly generate the examId
      const examId = (parseInt(Math.random() * 1000000));

      //create instance of exam using the parameters in the request body
      const exam = new Exam ({
          examId: examId, 
          examName: req.body.examName,
          startTime: req.body.startTime,
          endTime: req.body.endTime,
          details: req.body.details,
      });
  
      //create exam in the ExamDetails collection of mongodbDatabase
      const createdExam = await databaseMaster.dbOp('insert', 'ExamDetails', { docs: [exam] });


      //update the exam Id of the selected class
      console.log(req.body.className);
      const query = { className: req.body.className };
      const docs = { $set: { examId: examId } };
      await databaseMaster.dbOp('update', 'ClassDetails', { query, docs });
      res.json(createdExam);

  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;
