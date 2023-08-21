const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const studentRoutes = require('./routes/student');
const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');
const examRoutes = require('./routes/exam');
const landingRoutes = require('./routes/landing');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/student', studentRoutes);
app.use('/admin', adminRoutes);
app.use('/auth', authRoutes);
app.use('/exam', examRoutes);
app.use('/landing', landingRoutes);

// MongoDB Connection (do not commit plaintext credentials)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
