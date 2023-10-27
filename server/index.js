require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { Readable } = require('stream');
const { GridFSBucket } = require('mongodb');
const { dbOp, getDb } = require('./DatabaseAccess/databaseMaster');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const studentRoutes = require('./routes/student');
const classRoutes = require('./routes/class')
const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');
const examRoutes = require('./routes/exam');
const examStudentRoutes = require('./routes/examStudent');
const flagRoutes = require('./routes/flag');

const app = express();
const PORT = 4000;

 // Use multer for storing file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './videos/');
  },

  // Naming of video files
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// File filter
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'video/mp4' || file.mimetype === 'video/avi' || file.mimetype === 'video/webm') {
    console.log ("File Accepted");
    cb(null, true); // Accept file
  } else {
    console.log ("File Rejected");
    cb(null, false); // Reject file
  }
};

// Initialize Multer
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1024 * 1024 * 100, // 100 MB
  },
  fileFilter: fileFilter,
}).single('fullRecording');

//Test for multer
app.use((req, res, next) => {
  upload(req, res, function (err) {
    if (err) {
      console.error('Error in upload middleware:', err);
      return res.status(500).json({ error: 'File upload failed' });
    }
    console.log('Upload middleware processed file:', req.file);
    next();
  });
});

app.use(cors());
app.use(bodyParser.json());
app.use('/flag', flagRoutes);
app.use('/student', studentRoutes);
app.use('/class', classRoutes);
app.use('/admin', adminRoutes);
app.use('/auth', authRoutes);
app.use('/exam', examRoutes);
app.use('/examStudent', examStudentRoutes);

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

app.post('/saveVideo', async (req, res) => {
  const studentId = parseInt(req.body.studentId, 10);
  const examId = parseInt(req.body.examId, 10);
  const videoUrl = req.body.videoUrl;

  try {
    const result = await dbOp('upload-video', 'Exam-Student', { studentId, examId, videoUrl });

    if (result.modifiedCount === 1) {
      res.status(200).json({ message: 'Video URL saved successfully' });
    } else {
      res.status(404).json({ error: 'Document not found or not updated' });
    }
  } catch (error) {
    console.error('Error saving video:', error);
    res.status(500).json({ error: 'Error saving video' });
  }
});


app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});