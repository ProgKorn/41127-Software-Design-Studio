const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const flagRoutes = require('./routes/flag');
const { dbOp } = require('../DatabaseAccess/databaseMaster'); // Database Operations from master file

const app = express();
const PORT = 4000;
const Flag = require('../server/models/flagModel');

app.use(cors());
app.use(bodyParser.json());
app.use('/flag', flagRoutes);

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
