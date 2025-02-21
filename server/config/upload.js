const multer = require("multer");

// Configure storage (optional, since we're uploading directly to Cloudinary)
const storage = multer.memoryStorage(); 

// Initialize multer
const upload = multer({
  storage: storage,
});

module.exports = upload;
