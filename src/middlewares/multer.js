const multer = require("multer");
const path = require("path");

// Set up multer storage and file filter
const storage = multer.memoryStorage(); // Use memory storage for simplicity
const upload = multer({ storage });

module.exports = upload;
