const jwt = require("jsonwebtoken");

const jwtAuthMiddleWare = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
if (!token) {
    return res.status(401).json({ message: 'Unauthorized access' });
}

jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
    req.user = decoded;
    next();
});
}

const genrateToken = (user) => {
    return jwt.sign({ user }, process.env.JWT_SECRET);
}

module.exports = jwtAuthMiddleWare;