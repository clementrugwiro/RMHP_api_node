const pool = require("../../db"); // PostgreSQL connection

// Create or update contact information
const createContactInfo = async (contactData) => {
  const {
    email1,
    email2,
    phone1,
    phone2,
    location,
    instagram,
    linkedin,
    twitter,
    facebook,
  } = contactData;
  const query = `
        INSERT INTO contacts (email1, email2, phone1, phone2, location, instagram, linkedin, twitter, facebook)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *;
    `;
  return pool.query(query, [
    email1,
    email2,
    phone1,
    phone2,
    location,
    instagram,
    linkedin,
    twitter,
    facebook,
  ]);
};

// Get contact information
const getContactInfo = async () => {
  const query = "SELECT * FROM contacts ORDER BY id DESC LIMIT 1;";
  return pool.query(query);
};

// Update contact information
const updateContactInfo = async (id, contactData) => {
  const {
    email1,
    email2,
    phone1,
    phone2,
    location,
    instagram,
    linkedin,
    twitter,
    facebook,
  } = contactData;
  const query = `
        UPDATE contacts
        SET email1 = $1, email2 = $2, phone1 = $3, phone2 = $4, location = $5, instagram = $6, linkedin = $7, twitter = $8, facebook = $9
        WHERE id = $10
        RETURNING *;
    `;
  return pool.query(query, [
    email1,
    email2,
    phone1,
    phone2,
    location,
    instagram,
    linkedin,
    twitter,
    facebook,
    id,
  ]);
};

// Submit contact form
const submitContactForm = async (formData) => {
  const { name, email, message } = formData;
  const query = `
        INSERT INTO contact_us_form (name, email, message)
        VALUES ($1, $2, $3)
        RETURNING *;
    `;
  return pool.query(query, [name, email, message]);
};

// Get all contact form submissions
const getContactFormSubmissions = async () => {
  const query = "SELECT * FROM contact_us_form ORDER BY created_at DESC;";
  return pool.query(query);
};

module.exports = {
  createContactInfo,
  getContactInfo,
  updateContactInfo,
  submitContactForm,
  getContactFormSubmissions,
};
