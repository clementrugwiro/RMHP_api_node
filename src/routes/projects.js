const express = require("express");
const router = express.Router();
const projects = require("../controllers/projects");
const multer = require("multer");
const authenticate = require("../middlewares/authmiddleware");
const authorize = require("../middlewares/authorize");
const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({ storage: storage });


// Create a new project
router.post(
  "/",
  authenticate,
  authorize(["admin", "editor"]),
  upload.array("images", 3),
  projects.createProject
);

// Get all projects
router.get("/", projects.getAllProjects);

// Get project by ID
router.get("/:id", projects.getProjectById);

// Update a project
router.put(
  "/:id",
  authenticate,
  authorize(["admin", "editor"]),
  upload.array("images", 3),
  projects.updateProject
);

// Delete a project
router.delete(
  "/:id",
  authenticate,
  authorize(["admin", "editor"]),
  projects.deleteProject
);

module.exports = router;
