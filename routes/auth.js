//mantr\OneDrive\Desktop\canteen-frontend\canteen-backend\routes\auth.js
require('dotenv').config();
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

function generateToken(user) {
    return jwt.sign(
        { id: user._id, username: user.username, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    );
}

// Login route
router.post('/login', async (req, res) => {
    try {
        const { username, password, role } = req.body;
        const user = await User.findOne({ username, role });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = generateToken(user);
        res.json({ token, user: { username: user.username, role: user.role } });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Login failed', error: error.message });
    }
});

// Register route
router.post('/register', async (req, res) => {
    try {
        console.log('Register body:', req.body); // Debug log
        const { username, password, role, fullname, email } = req.body;
        if (!username || !password || !role) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const existingUser = await User.findOne({ username, role });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword, role, fullname, email });
        await newUser.save();
        const token = generateToken(newUser);
        res.json({ token, user: { username: newUser.username, role: newUser.role } });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Registration failed', error: error.message });
    }
});

module.exports = router;