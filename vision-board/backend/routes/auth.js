const express = require('express');
const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
const User = require('../models/User');
const authMiddleware = require('../middleware/authmiddleware');

const router = express.Router()


// User Register
router.post('/register', async(req, res) => {
    const {name, email, password} = req.body

    try {
        let user = await User.findOne({email})
        if(user) {
            return res.status(400).json({ message: 'User already exists'})
        }

        user = new User({ name, email, password })
        await user.save()

        const payload = { userId: user.id }
        const token = jwt.sign(payload, 'jwtSecret', { expiresIn: '1h' })

        res.json({ token })
    } catch (err) {
        res.status(500).json({ message: 'Server error' })
    }
})

// User Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body

    try { 
        const user = await User.findOne({ email })
        if(!user) {
            return res.status(400).json({ message: 'Invalid credentials' })
        }

        const isMatch = await user.matchPassword(password)
        if(!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' })
        }

        const payload = { userId: user.id}
        const token = jwt.sign(payload, 'jwtSecret', { expiresIn: '1h' })

        res.json({ token })
    } catch (err) {
        res.status(500).json({ message: 'Server error' })
    }
})

// User Prof
router.get('/profile', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password')
        res.json(user)
    } catch (err) {
        res.status(500).json({ message: 'Server error'})
    }
})


module.exports = router