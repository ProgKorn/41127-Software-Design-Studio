require('dotenv').config();
const multer = require('multer');
const upload = multer();
const express = require('express');
const cors = require('cors');
const { dbOp, getDb } = require('./DatabaseAccess/databaseMaster');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const studentRoutes = require('./routes/student');
const classRoutes = require('./routes/class')
const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');
const examRoutes = require('./routes/exam');
const flagRoutes = require('./routes/flag');
const { Readable } = require('stream'); //Import for video stream
const { GridFSBucket } = require('mongodb'); // Import GridFSBucket

const app = express(); // App for port 4000
const app2 = express(); // App for port 4001

const corsOptions = {
  origin: ['http://localhost:3000', 'https://sentinel-frontend.vercel.app'],
};

const PORT = 4000;
const PORT2 = 4001;

// Configure CORS to allow requests from http://localhost:3000 and https://sentinel-frotnend.vercel.app
app.use(cors(corsOptions));
app2.use(cors(corsOptions));

app.use(bodyParser.json());
app.use('/flag', flagRoutes);
app.use('/student', studentRoutes);
app.use('/class', classRoutes);
app.use('/admin', adminRoutes);
app.use('/auth', authRoutes);
app.use('/exam', examRoutes);

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

app.post('/saveVideo', upload.single('fullRecording'), async (req, res) => {
  console.log('Before processing /saveVideo request');
  const studentId = parseInt(req.body.studentId, 10);  // Matching studentId in MongoDB
  const examId = parseInt(req.body.examId, 10); // Matching examId in MongoDB
  const fullRecording = req.file;  // gets the uploaded file

  console.log('studentId:', studentId);
  console.log('examId:', examId);

  const db = getDb();
  const bucket = new GridFSBucket(db, {bucketName: 'recordings'});

  const uploadStream = bucket.openUploadStream(`${studentId}-${examId}`, {
    chunkSizeBytes: 1048576,  // 1MB
    metadata: { studentId, examId }
  });

  const id = uploadStream.id;
  const bufferStream = new Readable();
  bufferStream.push(fullRecording.buffer);
  bufferStream.push(null);
  bufferStream.pipe(uploadStream);

  uploadStream.on('finish', async () => {
  try {
    const result = await dbOp('upload-video', 'Exam-Student', { studentId, examId, fullRecording: id });
    
    console.log('Result from MongoDB:', result); // Debugging line
    
    if (result.modifiedCount === 1) {
      res.status(200).json({ message: 'Video saved successfully' });
    } else {
      res.status(404).json({ error: 'Document not found or not updated' });
    }
  } catch (error) {
    console.error('Error saving video:', error);
    res.status(500).json({ error: 'Error saving video' });
  }
});
console.log('After processing /saveVideo request');
});

app2.get('/', (req, res) => {
  const htmlResponse = '<div>Hello, World!</div>';
  res.send(htmlResponse);
});


app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});

app2.listen(PORT2, '0.0.0.0', () => {
  console.log(`Socket.io is running on port ${PORT2}`);
});