const express = require('express');
const auth = require('../utils/auth');
const jwt = require('jsonwebtoken');

const { config } = require('../config/config');
const router = express.Router();

router.post(
  '/login',
  auth.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      const payload = {
        sub: user.id,
        role: user.role,
      };
      const token = jwt.sign(payload, config.jwtSecret);
      res.json({ user, token });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
