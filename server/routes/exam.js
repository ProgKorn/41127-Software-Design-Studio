const express = require('express');
const databaseMaster = require('../DatabaseAccess/databaseMaster');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: 'Exam' });
});

router.get('/getExamDetails', async (req, res) => {
    try {
        const data = await databaseMaster.dbOp('find-exam', {});
        console.log(data);
        res.json(data); // Send the array of exam data directly
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
});

module.exports = router;
