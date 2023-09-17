const express = require('express');
const cors = require('cors');
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

app.post('/login', async(req, res) => {
  const { username, password } = req.body;

  const user = await dbOp('find', { email : username, password: password});

  if (user && user.length > 0) {
    res.json({ success: true, message: 'Login successful', isAdmin: user[0].isAdmin });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
