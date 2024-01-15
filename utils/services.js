
// Connect to Redis
const redis = require("redis");
const redisClient = redis.createClient();
/*
const redis = require("redis");

const { createClient } = require("redis-mock"); // For testing, you can use a mock library

const redisClient = createClient();*/


// Helper function to get data from Redis cache
function getFromCache(key) {
  return new Promise((resolve, reject) => {
    redisClient.get(key, (error, result) => {
      if (error) reject(error);
      resolve(result ? JSON.parse(result) : null);
    });
  });
}

// Helper function to set data in Redis cache
function setInCache(key, value) {
  return new Promise((resolve, reject) => {
    redisClient.set(key, 3600, JSON.stringify(value), (error) => {
      if (error) reject(error);
      resolve();
    });
  });
}

// Dummy analysis function
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