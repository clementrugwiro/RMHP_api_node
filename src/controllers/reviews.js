const pool = require("../../db");
const queries = require("../queries/reviews");

// Create a new review
const createReview = async (req, res) => {
  try {
    const { review, name, position } = req.body;
    const newReview = await pool.query(queries.CREATE_REVIEW, [
      review,
      name,
      position,
    ]);
    res.status(201).json({
      message: "Review created",
      data: newReview.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create review" });
  }
};

// Get all reviews
const getAllReviews = async (req, res) => {
  try {
    const result = await pool.query(queries.GET_ALL_REVIEWS);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get a review by ID
const getReviewById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(queries.GET_REVIEW_BY_ID, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a review
const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { review, name, position } = req.body;
    const result = await pool.query(queries.UPDATE_REVIEW, [
      review,
      name,
      position,
      id,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json({
      message: "Review updated",
      data: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update review" });
  }
};

// Delete a review
const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(queries.DELETE_REVIEW, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json({
      message: "Review deleted successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete review" });
  }
};

module.exports = {
  createReview,
  getAllReviews,
  getReviewById,
  updateReview,
  deleteReview,
};
