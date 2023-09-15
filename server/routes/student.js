const express = require('express');
const router = express.Router();


const Exam = require('../models/examModel');
const User = require('../models/userModel');
const databaseMaster = require('../DatabaseAccess/databaseMaster')

router.get('/', (req, res) => {
    res.json({ message: 'Student' });
});

router.get('/get', (req,res) => {
    databaseMaster.dbOp('find', 42345678).then(data => {console.log(data);
      const result = new User(data[0]);
      res.json(result);
  
    });
  });

module.exports = router;
