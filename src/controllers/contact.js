const contactModel = require("../models/contact");

// Create new contact info
const createContactInfo = async (req, res) => {
  try {
    const contactInfo = await contactModel.createContactInfo(req.body);
    res
      .status(201)
      .json({
        message: "Contact information created",
        data: contactInfo.rows[0],
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create contact information" });
  }
};

// Get the latest contact info
const getContactInfo = async (req, res) => {
  try {
    const contactInfo = await contactModel.getContactInfo();
    res.status(200).json({ data: contactInfo.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve contact information" });
  }
};

// Update existing contact info
const updateContactInfo = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedContactInfo = await contactModel.updateContactInfo(
      id,
      req.body
    );
    res
      .status(200)
      .json({
        message: "Contact information updated",
        data: updatedContactInfo.rows[0],
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update contact information" });
  }
};

// Submit contact form
const submitContactForm = async (req, res) => {
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
    const formSubmissions = await contactModel.getContactFormSubmissions();
    res.status(200).json({ data: formSubmissions.rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve form submissions" });
  }
};

module.exports = {
  createContactInfo,
  getContactInfo,
  updateContactInfo,
  submitContactForm,
  getContactFormSubmissions,
};
