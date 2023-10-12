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


module.exports = router;
