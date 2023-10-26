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
const { v4: uuidv4 } = require('uuid'); // Import uuidv4 from the uuid library
const Flag = require('/Users/georgettebashour/Projects/41127-Software-Design-Studio/server/models/flagModel.js');

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

const io = require('socket.io')(4001, {
  cors: {
    origin: ['http://localhost:3000'] // client URL
  }
});

io.on('connection', socket => { // function that runs everytime a client connects to our server, give a socket instance for each one
  console.log(socket.id); // each person who connects to our server is assigned an ID
  socket.on('custom-event', (number, string, obj) => {
    console.log(number, string, obj);
  })
});

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

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});

app.post('/addFlag', async (req, res) => { // Add a new flag
  try {
      // Create a new flag instance
      const newFlagId = uuidv4();
      console.log(newFlagId);

      const newFlag = new Flag ({
          flagId: newFlagId.toString(),
          examId: req.body.examId, 
          studentId: req.body.studentId,
          status: "Pending",
          description: req.body.flagType,
          sessionName: req.body.sessionName,
      });
      const flag = await dbOp('insert', 'FlaggedIncidents', { docs: [newFlag] });
      //io.emit('flag-added',{ message: 'New flag added!' });
      console.log("I have raised this flag " + newFlag);
      res.json(flag);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});