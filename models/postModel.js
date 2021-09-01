import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  userId: { type: Number, required: true },
  id: { type: Number, required: true },
  title: { type: String, required: true },
  body: { type: String, required: true },
  updatedManually: { type: Boolean, default: false },
});

const Post = mongoose.model("Post", postSchema, "posts");

export default Post;
