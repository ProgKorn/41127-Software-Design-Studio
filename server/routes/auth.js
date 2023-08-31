const express = require('express');
const router = express.Router();
//const User = require('../models/User');
//const bcrypt = require('bcrypt');

const User = [
  { id: 1, username: 'admin', password: 'adminpassword', role: 'admin' },
  { id: 2, username: 'student', password: 'studentpassword', role: 'user' },
]; 

router.get('/', (req, res) => {
  res.json({ message: 'Login' });
});

router.post('/', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = User.find(user => user.username === username)

    // const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // For now passwords are plaintext, the following code will be implemented once the DB is fully connected.
    // const isPasswordValid = await bcrypt.compare(password, user.password);
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    if (user.role === 'admin') {
      res.json({ role: 'admin' });
    } else {
      res.json({ role: 'user' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
