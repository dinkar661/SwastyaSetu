const jwt = require("jsonwebtoken");
const redisClient = require("../config/redis.js");

const protect = async (req, res, next) => {

    try {

        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: "Not authenticated"
            });
        }

        // Check Redis blacklist
        const blacklisted =
            await redisClient.get(
                `blacklist:${token}`
            );

        if (blacklisted) {

            return res.status(401).json({
                message: "Token has been revoked"
            });

        }

        // Verify JWT
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;

        next();

    } 
    catch (error) {

        return res.status(401).json({
            message: "Invalid or expired token"
        });

    }
};

module.exports = { protect };