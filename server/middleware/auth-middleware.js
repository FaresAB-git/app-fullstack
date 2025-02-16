const jwt = require('jsonwebtoken');
const {User} = require('../models/User');

const auth = async (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const token = authHeader.replace('Bearer ', ''); // Remove Bearer from token
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
        req.user = decoded.user;
        const user = await User.findOne({ email: req.user.email });
        if (!user) {
            return res.status(401).json({ message: 'User not found, authorization denied' });
        }
        
        next();
    } catch (err) {
        
        res.status(401).json({ message: 'Token is not valid', error: err.message });
    }
};

module.exports = auth;