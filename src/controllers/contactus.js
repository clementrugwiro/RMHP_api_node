const contactModel = require("../models/contactus");

// Submit contact form with subject validation
const submitContactForm = async (req, res) => {
  const { subject } = req.body;

  // Validate subject
  const validSubjects = ["General Inquiry", "Support", "Partnership"];
  if (!validSubjects.includes(subject)) {
    return res
      .status(400)
      .json({
        error:
          "Invalid subject. Must be one of General Inquiry, Support, or Partnership.",
      });
  }

  try {
    const contactForm = await contactModel.submitContactForm(req.body);
    res
      .status(201)
      .json({ message: "Contact form submitted", data: contactForm.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to submit contact form" });
  }
};

// Get all contact form submissions
const getContactFormSubmissions = async (req, res) => {
  try {
    const submissions = await contactModel.getContactFormSubmissions();
    res.status(200).json({ data: submissions.rows });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Failed to retrieve contact form submissions" });
  }
};

module.exports = {
  submitContactForm,
  getContactFormSubmissions,
};
