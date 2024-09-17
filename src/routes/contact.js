const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contact");

// Routes for handling contact information
router.get("/", contactController.getContactInfo);
router.post("/", contactController.createContactInfo);
router.put("/:id", contactController.updateContactInfo);

// Routes for handling contact form submissions
router.post("/contact-us", contactController.submitContactForm);
router.get("/contact-us", contactController.getContactFormSubmissions);

module.exports = router;
