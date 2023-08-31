const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const studentRoutes = require('./routes/student');
const adminRoutes = require('./routes/admin');
const loginRoutes = require('./routes/auth');
const examRoutes = require('./routes/exam');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

// Once post requests work consistently, change * to localhost:3000.
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());
app.use('/student', studentRoutes);
app.use('/admin', adminRoutes);
app.use('/login', loginRoutes);
app.use('/exam', examRoutes);

// MongoDB Connection (do not commit plaintext credentials)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
