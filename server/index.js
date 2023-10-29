require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { dbOp } = require('./DatabaseAccess/databaseMaster');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const studentRoutes = require('./routes/student');
const classRoutes = require('./routes/class');
const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');
const examRoutes = require('./routes/exam');
const examStudentRoutes = require('./routes/examStudent');
const flagRoutes = require('./routes/flag');

const app = express();
const PORT = 4000;

app.use(bodyParser.json());
app.use('/flag', flagRoutes);
app.use('/student', studentRoutes);
app.use('/class', classRoutes);
app.use('/admin', adminRoutes);
app.use('/auth', authRoutes);
app.use('/exam', examRoutes);
app.use('/examStudent', examStudentRoutes);

const corsOptions = {
  origin: ['http://localhost:3000', 'https://sentinel-frontend.vercel.app'],
};

app.use(cors(corsOptions));

// Configure CORS to allow requests from http://localhost:3000 and https://sentinel-frotnend.vercel.app
app.post('/login', async(req, res) => {
  const { username, password, keepSignedIn } = req.body;

  const user = await dbOp('find', 'UserDetails', { query: { email: username } });

  if (!user || user.length === 0) {
    res.status(401).json({ success: false, message: 'User not found' });
  } else if (user[0].password && await bcrypt.compare(password, user[0].password)) {
    const payload = {
      userName: user[0].email,
      isAdmin: user[0].isAdmin,
    };
  
    const expiresIn = keepSignedIn ? 'never' : '4h';
    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn });
  
    res.json({
      success: true,
      message: 'Login successful',
      isAdmin: user[0].isAdmin,
      token,
    });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

app.post('/studentlogin', async(req, res) => {
  const { username, keepSignedIn, facialData } = req.body;

  const student = await dbOp('find', 'StudentDetails', { query: { email: username } });

  if (!student || student.length === 0) {
    res.status(401).json({ success: false, message: 'Student not found' });
  } else if (facialData === true) {
    const payload = {
      userName: student[0].email,
      isAdmin: false,
    };
  
    const expiresIn = keepSignedIn ? 'never' : '4h';
    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn });
  
    res.json({
      success: true,
      message: 'Login successful',
      isAdmin: false,
      token
    });
  } else {
    res.status(401).json({ success: false, message: 'Facial data does not match any existing users in the database' });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});