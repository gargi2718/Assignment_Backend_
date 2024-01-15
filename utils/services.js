
const { promisify } = require("util");
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

const getAsync = promisify(redisClient.get).bind(redisClient);

async function getFromCache(key) {
  try {
    const cachedData = await getAsync(key);
    return cachedData ? JSON.parse(cachedData) : null;
  } catch (error) {
    console.error("Error in getFromCache:", error);
    throw error;
  }
}

function setInCache(key, value) {
  try {
    redisClient.set(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error in setInCache:", error);
    throw error;
  }
}

function analyzePost(text) {
  const words = text.split(/\s+/);
  const wordCount = words.length;
  const totalLength = words.reduce((acc, word) => acc + word.length, 0);
  const averageWordLength = totalLength / wordCount;

  return {
    wordCount,
    averageWordLength,
  };
}

module.exports = { getFromCache, analyzePost, setInCache };

