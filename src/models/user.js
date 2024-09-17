// models/user.js
const pool = require("../../db");
const bcrypt = require("bcrypt");
const queries = require("../queries/user");

 // Configure your PostgreSQL pool connection
const saltRounds = 10;

const updateUser = async (id, updates) => {
  // Extract fields from the updates object
  const fields = [];
  const values = [];

  // Dynamically create the SQL query
  Object.keys(updates).forEach((key, index) => {
    fields.push(`${key} = $${index + 1}`);
    values.push(updates[key]);
  });

  // Ensure there is at least one field to update
  if (fields.length === 0) {
    throw new Error("No fields to update");
  }

  // Add the ID to the end of the values array
  values.push(id);

  // Create the SQL query string
  const query = `UPDATE users SET ${fields.join(
    ", "
  )}, updated_at = CURRENT_TIMESTAMP WHERE id = $${values.length}`;

  return pool.query(query, values);
};

// Query to get all users
const getAllUsers = async () => {
  return pool.query(queries.GET_ALL_USERS);
};

const createUser = async (userData) => {
    console.log(userData)
  const { name, email, password, role } = userData;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  console.log(hashedPassword)
  return pool.query(queries.CREATE_USER, [name, email, hashedPassword, role]);
};

const getUserById = async (id) => {
  return pool.query(queries.GET_USER_BY_ID, [id]);
};

const deleteUser = async (id) => {
  return pool.query(queries.DELETE_USER_BY_ID,[id]);
};

const getUserByEmail = async (email) => {
  try {
    const result = await pool.query(queries.GET_USER_BY_EMAIL, [
      email,
    ]);
    return result.rows[0]; // Return the first user found
  } catch (error) {
    console.error("Error getting user by email:", error);
    throw error; // Rethrow error for handling in controller
  }
};



// Other model functions (getAllUsers, getUserById, etc.)

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserByEmail
  // Other model functions
};
