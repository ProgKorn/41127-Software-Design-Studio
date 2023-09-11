const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const studentRoutes = require('./routes/student');
const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');
const examRoutes = require('./routes/exam');
const databaseMaster = require('../DatabaseAccess/databaseMaster');
const app = express();
const port = process.env.PORT || 3000;
const User = require('../server/models/userModel');
const Exam = require('../server/models/examModel');



app.use(bodyParser.json());
app.use('/student', studentRoutes);
app.use('/admin', adminRoutes);
app.use('/auth', authRoutes);
app.use('/exam', examRoutes);

// MongoDB Connection (do not commit plaintext credentials)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get('/getStudentDetails', (req,res) => {
  databaseMaster.dbOp('find', 42345678).then(data => {console.log(data);
    const result = new User(data[0]);
    res.json(result);

  });
});

app.get('/getExamDetails', (req,res) => {
  databaseMaster.dbOp('find', 1).then(data => {console.log(data);
  const result = new Exam(data[0]);
  res.json(result);
  })
})