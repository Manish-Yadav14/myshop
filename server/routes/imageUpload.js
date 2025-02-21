const express = require("express");
const router = express.Router();

const upload = require('../config/upload');
const cloudinary = require('../config/cloudinaryConfig');

// API Route to handle image upload
router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Upload to Cloudinary
    const result = cloudinary.uploader
      .upload_stream({ folder: "ecommerce" }, (error, result) => {
        if (error) return res.status(500).json({ error: error.message });
        res.json({ imageUrl: result.secure_url });
      })
      .end(req.file.buffer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
