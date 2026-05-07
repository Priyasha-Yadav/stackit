const asyncHandler = require('../utils/asyncHandler');

const jwt = require('jsonwebtoken');

const auth = asyncHandler((req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        const err = new Error('Authorization header missing');
        err.status = 401;
        throw err
    }

    const parts = authHeader.split(' ');

    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        const err = new Error('Invalid authorization format');
        err.status = 401;
        throw err
    }

    const token = parts[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
});

module.exports = auth