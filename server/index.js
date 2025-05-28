require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fs = require("fs");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const sanitizeHtml = require("sanitize-html");

const app = express();
app.use(cors());
app.use(express.json());

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// MongoDB
mongoose.connect(process.env.MONGO_URI);

// Mongoose schema
const Post = mongoose.model(
  "Post",
  new mongoose.Schema({
    title: String,
    content: String,
    image: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  })
);

// Auth middleware
const authenticate = (req, res, next) => {
  const token = req.headers["authorization"];
  if (token === `Bearer ${process.env.ADMIN_TOKEN}`) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

// Routes
app.get("/api/posts", async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.json(posts);
});

app.post("/api/posts", authenticate, async (req, res) => {
  const { title, content, image } = req.body;
  const clean = sanitizeHtml(content, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
    allowedAttributes: { a: ["href", "target"], img: ["src", "alt"] },
  });

  const post = new Post({ title, content: clean, image });
  await post.save();
  res.json(post);
});

// Image upload
const upload = multer({ dest: "uploads/" });
app.post("/api/upload", upload.single("image"), (req, res) => {
  cloudinary.uploader.upload(req.file.path, (err, result) => {
    fs.unlinkSync(req.file.path);
    if (err) return res.status(500).json({ error: err });
    res.json({ url: result.secure_url });
  });
});

// Start server
app.listen(process.env.PORT || 4000, () => {
  console.log("✅ Backend server running on port 4000");
});
