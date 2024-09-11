const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]

    if(!token) {
        return res.status(401).json({ message: 'No token found, authorization denied'})
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = decoded.userId
        next()
    } catch (err) {
        res.status(401).json({ message: 'Invalid token, authorization denied' })
    }
    
}

module.exports = authMiddleware