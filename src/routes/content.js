const express = require("express");
const router = express.Router();
const contentController = require("../controllers/content");
const authenticate = require("../middlewares/authmiddleware");
const authorize = require("../middlewares/authorize");


// Get content
router.get("/:id", contentController.getContent);

// Create new content
router.post(
  "/",
  authenticate,
  authorize(["admin", "editor"]),
  contentController.createContent
);

// Update content by ID
router.put(
  "/:id",
  authenticate,
  authorize(["admin", "editor"]),
  contentController.updateContent
);

module.exports = router;
