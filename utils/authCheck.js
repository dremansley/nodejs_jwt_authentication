const authCheck = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.status(401).send('Unauthorized');
    }
};

module.exports = authCheck;
