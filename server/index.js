const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const studentRoutes = require('./routes/student');
const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');
const examRoutes = require('./routes/exam');
const app = express();
const port = process.env.PORT || 4000;
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use('/student', studentRoutes);
app.use('/admin', adminRoutes);
app.use('/auth', authRoutes);
app.use('/exam', examRoutes);

// MongoDB Connection (do not commit plaintext credentials)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
