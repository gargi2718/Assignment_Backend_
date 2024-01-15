const Post = require("../models/Post");
const { getFromCache, analyzePost, setInCache } = require('../utils/services');

// Connect to Redis from index 
const {redisClient }= require("../index");

// Post Creation Endpoint
exports.createPost = async (req, res) => {
  try {
    const { postId, text } = req.body;
    const newPost = new Post({ postId, text });
    await newPost.save();
    res.status(201).json({ message: "Post created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getAnalysis = async (req, res) => {
  try {
    const postId = req.params.id;
    const cachedResult = await getFromCache(postId, req.redisClient);

    if (cachedResult) {
      res.json(cachedResult);
    } else {
      const post = await Post.findOne({ postId });
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }

      const analysisResult = analyzePost(post.text);
      await setInCache(postId, analysisResult, req.redisClient);

      res.json(analysisResult);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
