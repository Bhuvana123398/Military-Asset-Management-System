const express = require('express');
const router = express.Router();
const User = require('../models/User');
router.get('/setup-users', async (req, res) => {
    const users = [
        { username: 'admin', role: 'Admin', password: 'password123', base: 'All' },
        { username: 'alpha_cmd', role: 'Commander', password: 'password123', base: 'Base Alpha' },
        { username: 'logistics_01', role: 'Logistics', password: 'password123', base: 'All' }
    ];
    await User.deleteMany({}); 
    await User.insertMany(users);
    res.send("Military personnel accounts created!");
});
module.exports = router;