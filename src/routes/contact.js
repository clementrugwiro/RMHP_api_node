const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contact");
const authenticate = require("../middlewares/authmiddleware");
const authorize = require("../middlewares/authorize");


// Routes for handling contact information
router.get("/", contactController.getContactInfo);
router.post(
  "/",
  authenticate,
  authorize(["admin", "editor"]),
  contactController.createContactInfo
);
router.put(
  "/:id",
  authenticate,
  authorize(["admin", "editor"]),
  contactController.updateContactInfo
);

// Routes for handling contact form submissions
router.post("/contact-us", contactController.submitContactForm);
router.get("/contact-us", contactController.getContactFormSubmissions);

module.exports = router;
