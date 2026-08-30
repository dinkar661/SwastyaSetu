const dotenv = require("dotenv");

dotenv.config();

const app = require("./src/app.js");
const { connectDB } = require("./src/config/db.js");
const redisClient = require("./src/config/redis.js");

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {

        // Connect MongoDB
        await connectDB();

        // Connect Redis
        await redisClient.connect();

        console.log("Redis connected successfully");

        // Start Express
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (error) {

        console.error(
            "Server startup failed:",
            error.message
        );

        process.exit(1);
    }
};

startServer();