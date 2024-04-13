const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: "No token" });
    }
    jwt.verify(token.split(' ')[1], process.env.SECRET,{ maxAge: '1h' }, (err, decoded) => {
        if (err) {
            console.log(err);
            return res.status(403).json({ message: "Authorization failed" });
        }
        req.user = decoded;
        next();
    });
}

module.exports = { verifyToken };