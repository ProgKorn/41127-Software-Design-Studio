const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const studentRoutes = require('./routes/student');
const adminRoutes = require('./routes/admin');
const loginRoutes = require('./routes/auth');
const examRoutes = require('./routes/exam');

const app = express();
const PORT = 4000;
// process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// app.use(cors({
//   origin: '*',
//   methods: ['GET', 'POST', 'PUT', 'DELETE']
// }));

// Once post requests work consistently, change * to localhost:3000.
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*"); 
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

// app.use(bodyParser.json());
// app.use('/student', studentRoutes);
// app.use('/admin', adminRoutes);
// app.use('/login', loginRoutes);
// app.use('/exam', examRoutes);

// replace this when DB is connected
const users = [
  { id: 1, username: 'user1', password: 'password1' },
  { id: 2, username: 'user2', password: 'password2' },
  // Add more users as needed
];

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Simulated user authentication (replace with your actual authentication logic)
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    res.json({ success: true, message: 'Login successful' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

// MongoDB Connection (do not commit plaintext credentials)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
