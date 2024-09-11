const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authMiddleware = require('../middleware/authmiddleware');
const router = express.Router()


router.post('/register', async(req, res) => {
    const {name, email, password} = req.body

    try {
        if (!email.match(/^\S+@\S+\.\S+$/)) {
            return res.status(400).json({ message: 'Invalid email format'})
        }

        let user = await User.findOne({email})
        if(user) {
            return res.status(400).json({ message: 'User already exists'})
        }

        user = new User({ name, email, password })
        await user.save()

        const payload = { userId: user.id }
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' })

        res.json({ token })
    } catch (err) {
        res.status(500).json({ message: 'Server error' })
    }
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body

    try { 
        const user = await User.findOne({ email })
        if(!user) {
            return res.status(400).json({ message: 'Invalid credentials' })
        }

        const isMatch = await user.matchPassword(password)
        if(!isMatch) {
            return res.status(400).json({ message: 'Wrong password' })
        }

        const payload = { userId: user.id}
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' })

        res.json({ token })
    } catch (err) {
        res.status(500).json({ message: 'Server error' })
    }
})

router.get('/profile', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password')
        res.json(user)
    } catch (err) {
        res.status(500).json({ message: 'Server error'})
    }
})


module.exports = router