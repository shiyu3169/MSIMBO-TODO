const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');

const router = express.Router();

const auth = require('../middleware/auth');
const User = require('../models/User');

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  let user = await User.findOne({ email });
  if (!user) {
    res.json(null);
  } else {
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.json(null);
    } else {
      const payload = {
        user: {
          id: user.id
        }
      };
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: '1d' },
        (err, token) => {
          if (err) {
            throw err;
          }
          res.json({ token, user });
        }
      );
    }
  }
});

// Register
router.post('/', async (req, res) => {
  const newUser = new User({ ...req.body });
  // Create salt & hash
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      throw err;
    }
    bcrypt.hash(newUser.password, salt, async (err, hash) => {
      if (err) {
        throw err;
      }
      newUser.password = hash;
      const user = await newUser.save();
      const payload = {
        user: {
          id: user.id
        }
      };
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: '1d'
        },
        (err, token) => {
          if (err) {
            throw err;
          }
          res.json({ token, user });
        }
      );
    });
  });
});

// Get User
router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const data = await User.findById(id, '-password').populate('image');
  res.json(data);
});

module.exports = router;
