const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactus");
const authenticate = require("../middlewares/authmiddleware");
const authorize = require("../middlewares/authorize");


// Route to submit contact form
router.post("/contactus", contactController.submitContactForm);

// Route to retrieve all contact form submissions
router.get(
  "/contactus/submissions",
  authenticate,
  authorize(["admin", "editor"]),
  contactController.getContactFormSubmissions
);

module.exports = router;
