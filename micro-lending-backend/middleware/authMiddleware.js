const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '')

    if (!token) {
        return res.status(401).json({ message: "Access denied, token not provided" })
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch(err) {
        return res.status(400).json({ message: "Invalid or expired token" });
    }
};

module.exports = verifyToken;