
const express = require("express");
const rateLimit = require("express-rate-limit");
const { DBConnection } = require("./database/db");
const postRoutes = require("./routes/route");
const app = express();
const port = process.env.PORT || 8000;

const redis = require("redis");
let redisClient;

if (process.env.NODE_ENV === "production") {
  const redis = require("redis");
  redisClient = redis.createClient();

  redisClient.on("error", (err) => {
    console.error("Redis error:", err);
  });
} else {
  // Use the mock client for development
  const { createClient } = require("redis-mock");
  redisClient = createClient();
}

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Pass Redis client to routes
app.use((req, res, next) => {
  req.redisClient = redisClient;
  next();
});

//use database
DBConnection();
//use router
app.use("/", postRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports={redisClient}