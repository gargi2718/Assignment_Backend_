const express = require("express");
const { createPost, getAnalysis } = require("../controller/postController");

const router = express.Router();

router.post("/api/v1/posts", createPost);
router.get("/api/v1/posts/:id/analysis", getAnalysis);

module.exports = router;
