const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const studentRoutes = require('./routes/student');
const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');
const examRoutes = require('./routes/exam');
const FlagModel = requre('./models/flagModel');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/student', studentRoutes);
app.use('/admin', adminRoutes);
app.use('/auth', authRoutes);
app.use('/exam', examRoutes);

// MongoDB Connection (do not commit plaintext credentials)
mongoose.connect("mongodb+srv://Amy:amy@proctordb.ifkuafa.mongodb.net/?retryWrites=true&w=majority")

app.get('/getFlagLog', (req, res) => {
  FlagModel.find()
  .then(flags => res.json(flags))
  .catch(err => res.json(err))
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
