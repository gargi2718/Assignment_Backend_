/*
// Connect to Redis
const redis = require("redis");
const redisClient = redis.createClient();




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
*/
/*
// services.js
const redis = require("redis");
const { promisify } = require("util");
const { redisClient } = require("../index"); // Assuming your Redis client is in the root index file

// Helper function to get data from Redis cache
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

// Helper function to set data in Redis cache
function setInCache(key, value) {
  try {
    redisClient.set(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error in setInCache:", error);
    throw error;
  }
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
*/
// services.js
/*
const redis = require("redis");
const redisClient = redis.createClient();
const getAsync = promisify(redisClient.get).bind(redisClient);
const { promisify } = require("util");
const { redisClient } = require("../index"); // Update the path accordingly
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

// service.js
const { promisify } = require("util");
const { redisClient } = require("../index"); // Update the path accordingly
if (!redisClient) {
  throw new Error("Redis client is not defined");
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
// service.js

*/
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

