const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  postId: { type: String, unique: true, required: true },
  text: { type: String, required: true },
});

module.exports = mongoose.model("Post", postSchema);