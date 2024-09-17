const pool = require("../../db");

// Submit contact form with subject
const submitContactForm = async (formData) => {
  const { name, email, subject, message } = formData;
  const query = `
        INSERT INTO contact_us_form (name, email, subject, message)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
    `;
  return pool.query(query, [name, email, subject, message]);
};

// Get all contact form submissions
const getContactFormSubmissions = async () => {
  const query = "SELECT * FROM contact_us_form ORDER BY created_at DESC;";
  return pool.query(query);
};

module.exports = {
  submitContactForm,
  getContactFormSubmissions,
};
