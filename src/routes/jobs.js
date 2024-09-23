const express = require("express");
const router = express.Router();
const jobController = require("../controllers/jobs");
const  authorize  = require("../middlewares/authorize");
const authenticate = require('../middlewares/authmiddleware')

// Create a new job
router.post(
  "/",
  authenticate,
  authorize(["admin", "editor"]),
  jobController.createJob
);

// Get all jobs
router.get("/", jobController.getAllJobs);

// Get job by ID
router.get("/:id", jobController.getJobById);

// Update a job
router.put(
  "/:id",
  authenticate,
  authorize(["admin", "editor"]),
  jobController.updateJob
);

// Delete a job
router.delete(
  "/:id",
  authenticate,
  authorize(["admin", "editor"]),
  jobController.deleteJob
);

module.exports = router;
