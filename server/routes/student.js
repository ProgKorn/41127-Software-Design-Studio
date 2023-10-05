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


module.exports = router;
