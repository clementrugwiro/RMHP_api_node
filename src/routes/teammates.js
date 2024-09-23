const express = require("express");
const router = express.Router();
const teammateController = require("../controllers/teammates");
const multer = require("multer");
const authenticate = require("../middlewares/authmiddleware");
const authorize = require("../middlewares/authorize");


// Set up multer for file uploads (binary image upload)
const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({ storage: storage });

// Route to create a new teammate (with image upload)
router.post(
  "/add",
  authenticate,
  authorize(["admin", "editor"]),
  upload.single("image"),
  teammateController.createTeamMate
);

// Route to get all teammates
router.get("/", teammateController.getAllTeammates);

// Route to get a teammate by ID
router.get("/:id", teammateController.getTeammateById);

// Route to update a teammate
router.put(
  "/:id",
  authenticate,
  authorize(["admin", "editor"]),
  upload.single("image"),
  teammateController.updateTeamMate
);

// Route to delete a teammate by ID
router.delete(
  "/:id",
  authenticate,
  authorize(["admin", "editor"]),
  teammateController.deleteTeammate
);

module.exports = router;
