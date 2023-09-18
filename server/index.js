require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { dbOp } = require('./DatabaseAccess/databaseMaster');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const studentRoutes = require('./routes/student');
const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');
const examRoutes = require('./routes/exam');


const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());
app.use('/student', studentRoutes);
app.use('/admin', adminRoutes);
app.use('/auth', authRoutes);
app.use('/exam', examRoutes);

app.post('/login', async(req, res) => {
  const { username, password, keepSignedIn } = req.body;

  const user = await dbOp('find-user', { email : username});

  if (!user || user.length === 0) {
    res.status(401).json({ success: false, message: 'User not found' });
  } else if (user[0].password && await bcrypt.compare(password, user[0].password)) {
    const payload = {
      userName: user[0].email,
      isAdmin: user[0].isAdmin,
    };
  
    const expiresIn = keepSignedIn ? 'never' : '1h';
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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
