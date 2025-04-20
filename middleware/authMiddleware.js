// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

const authenticateRestaurant = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) return res.status(401).json({ message: "Authorization required" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.restaurant = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

module.exports = { authenticateRestaurant };
