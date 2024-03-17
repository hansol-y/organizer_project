const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

function verifyToken(req, res, next) {
    const token = req.headers['JWT_Token'];

    if (!token) {
        return res.status(401).json({message: "No token provided"});
    }

    jwt.verify(token, JWT_SECRET, (err, verified) => {
        if (err) {
            return res.status(403).json({message: "The given token is invalid. Please check the token again"});
        }

        req.userId = verified.userId;
        next();
    })
}

module.exports = verifyToken;