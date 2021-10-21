const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) return res.status(401).json({
        error: {
            name: 'AccessDenied',
            message: 'Token not found.'
        }
    });

    try {
        const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(403).json({
            error: {
                name: err.name,
                message: err.message,
                expiredAt: err.expiredAt
            }
        });
    }
};