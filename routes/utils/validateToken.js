// const jwt = require('jsonwebtoken');

module.exports = function (req, res, h) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) {
        return {
            isValid: false, error: {
                name: 'AccessDenied',
                message: 'Token not found.'
            }
        }
    }
    // } return res.status(401).json({
    //     error: {
    //         name: 'AccessDenied',
    //         message: 'Token not found.'
    //     }
    // });

    try {
        const verified = jwt.decode(token, process.env.ACCESS_TOKEN_SECRET);
        return { isValid: true, credential: { token: verified } };
    } catch (err) {
        return {
            isValid: false, error: {
                name: 'Token not is not valid',
                message: err.message
            }
        }
    }
};