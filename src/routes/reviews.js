const express = require("express");
const router = express.Router();
const reviews = require("../controllers/reviews");
const authenticate = require("../middlewares/authmiddleware");
const authorize = require("../middlewares/authorize");


// Create a new review
router.post("/", reviews.createReview);

// Get all reviews
router.get("/", reviews.getAllReviews);

// Get a review by ID
router.get("/:id", reviews.getReviewById);

// Update a review
router.put(
  "/:id",
  authenticate,
  authorize(["admin", "editor"]),
  reviews.updateReview
);

// Delete a review
router.delete(
  "/:id",
  authenticate,
  authorize(["admin", "editor"]),
  reviews.deleteReview
);

module.exports = router;
