const express = require('express');
const databaseMaster = require('../DatabaseAccess/databaseMaster');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: 'Exam' });
});

router.get('/getExamDetails', async (req, res) => {
  try {
    const data = await databaseMaster.dbOp('find', 'ExamDetails', { query: {} });
    console.log(data);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

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

module.exports = router;
