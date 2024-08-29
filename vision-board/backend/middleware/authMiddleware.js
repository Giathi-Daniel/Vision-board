const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')

    if(!token) {
        return res.status(401).json({ message: 'No token found, authorization denied'})
    }

    try {
        const decoded = jwt.verify(token, 'jwtSecret')
        req.userId = decoded.userId
        next()
    } catch (err) {
        res.status(401).json({ message: err.message })
    }
    
}

module.exports = authMiddleware