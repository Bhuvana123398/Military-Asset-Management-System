const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
router.post('/login', async (req, res) => {
  const { username, role } = req.body;
  const user = { 
    id: "123", 
    username: username, 
    role: role, 
    base: role === 'Commander' ? 'Base Alpha' : 'All' 
  };
  const token = jwt.sign(user, process.env.JWT_SECRET || 'military_secret_key_123', { expiresIn: '1h' });
  res.json({ token, role: user.role, base: user.base });
});
module.exports = router;