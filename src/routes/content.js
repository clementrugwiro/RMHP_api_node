const express = require("express");
const router = express.Router();
const contentController = require("../controllers/content");

// Get content
router.get("/:id", contentController.getContent);

// Create new content
router.post("/", contentController.createContent);

// Update content by ID
router.put("/:id", contentController.updateContent);

module.exports = router;
