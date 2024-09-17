const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactus");

// Route to submit contact form
router.post("/contactus", contactController.submitContactForm);

// Route to retrieve all contact form submissions
router.get("/contactus/submissions", contactController.getContactFormSubmissions);

module.exports = router;
