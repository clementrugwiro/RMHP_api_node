const express = require("express");
const router = express.Router();
const reviews = require("../controllers/reviews");

// Create a new review
router.post("/", reviews.createReview);

// Get all reviews
router.get("/", reviews.getAllReviews);

// Get a review by ID
router.get("/:id", reviews.getReviewById);

// Update a review
router.put("/:id", reviews.updateReview);

// Delete a review
router.delete("/:id", reviews.deleteReview);

module.exports = router;
