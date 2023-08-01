const express = require('express');
const { User } = require('../models');
const router = express.Router();
const bcrypt = require('bcrypt');

router.post('/register', async (req, res) => {
  try {
    // Check if a user with the given username already exists
    const existingUser = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (existingUser) {
      // If a user exists, send an error response
      res.status(409).json({ error: 'Username is already taken.' });
    } else {
      // If no user exists, create a new one
      const user = await User.create({
        username: req.body.username,
        password: req.body.password,
      });

      res.status(201).json(user);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ error: 'Incorrect password' });
    }

    const userWithoutPassword = {
      id: user.id,
      username: user.username,
    };

    // Successful login
    res.json(userWithoutPassword);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
