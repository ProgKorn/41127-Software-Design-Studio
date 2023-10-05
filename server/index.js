require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { dbOp } = require('./DatabaseAccess/databaseMaster');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const studentRoutes = require('./routes/student');
const classRoutes = require('./routes/class')
const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');
const examRoutes = require('./routes/exam');
const flagRoutes = require('./routes/flag');

const app = express();
const PORT = 4000;

app.use(cors());
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

app.post('/studentlogin', async(req, res) => {
  const { username, keepSignedIn, facialData } = req.body;

  const student = await dbOp('find', 'StudentDetails', { query: { email: username } });

  if (!student || student.length === 0) {
    res.status(401).json({ success: false, message: 'Student not found' });
  } else if (compareFacialData(facialData, student[0].faceImageUrl)) {
    const payload = {
      userName: student[0].email,
      isAdmin: false,
    };
  
    const expiresIn = keepSignedIn ? 'never' : '1h';
    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn });
  
    res.json({
      success: true,
      message: 'Login successful',
      isAdmin: false,
      token,
    });
  } else {
    res.status(401).json({ success: false, message: 'Facial data does not match any existing users in the database' });
  }
});

async function compareFacialData(detectedImage, referenceImage) {
  // Detect facial landmarks in the detected image
  const detectedFaces = await model.estimateFaces(detectedImage);

  if (detectedFaces.length !== 1) {
    // Handle cases where no face or multiple faces are detected
    return false;
  }

  const detectedLandmarks = detectedFaces[0].landmarks;
  const referenceLandmarks = getReferenceLandmarks(); // Replace with your reference landmarks

  if (detectedLandmarks.length !== referenceLandmarks.length) {
    return false;
  }

  const similarityThreshold = 50;
  const squaredDistances = [];

  for (let i = 0; i < detectedLandmarks.length; i++) {
    const detectedPoint = detectedLandmarks[i];
    const referencePoint = referenceLandmarks[i];
    const squaredDistance = Math.pow(detectedPoint[0] - referencePoint.x, 2) +
      Math.pow(detectedPoint[1] - referencePoint.y, 2);
    squaredDistances.push(squaredDistance);
  }

  const averageSquaredDistance = squaredDistances.reduce((sum, distance) => sum + distance, 0) / squaredDistances.length;

  if (averageSquaredDistance < similarityThreshold) {
    return true;
  }

  return false;
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});