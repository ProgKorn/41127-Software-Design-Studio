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


module.exports = router;
