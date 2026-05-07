const isAdmin = (req, res, next) => {
    if (!req.user) {
        const err = new Error('Authentication required');
        err.status = 401;
        throw err;
    }

    if (req.user.role !== 'admin') {
        const err = new Error('Access denied');
        err.status = 403;
        throw err;
    }
    next();
};

module.exports = isAdmin;