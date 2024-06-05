const jwt = require('jsonwebtoken');
const secret = 'your_jwt_secret';

// Generate a JWT token
function generateToken(user) {
    return jwt.sign({ id: user._id }, secret, { expiresIn: '1h' });
}

// Middleware to verify the token
function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
    if (token) {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                return res.status(401).send('Invalid token');
            } else {
                req.user = decoded;
                next();
            }
        });
    } else {
        res.status(401).send('No token provided');
    }
}

module.exports = {
    generateToken,
    authenticateToken
};
