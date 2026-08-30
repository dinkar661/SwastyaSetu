const { createClient } = require("redis");

const redisClient = createClient({
    username: "default",
    password: process.env.REDIS_PASS,
    socket: {
        host: 'fulgent-hand-hyperstylish-33360.db.redis.io',
        port: 13027
    }
});

redisClient.on("error", (err) => {
    console.error("Redis Client Error:", err);
});

module.exports = redisClient;