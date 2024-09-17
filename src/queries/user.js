// queries/user.js

// Query to create a new user
const CREATE_USER = `
  INSERT INTO users (name, email, password_hash, role)
  VALUES ($1, $2, $3, $4)
  RETURNING *;
`;

// Query to get all users
const GET_ALL_USERS = `
  SELECT * FROM users;
`;

// Query to get a user by ID
const GET_USER_BY_ID = `
  SELECT * FROM users WHERE id = $1;
`;
const GET_USER_BY_EMAIL = `
  SELECT * FROM users WHERE email = $1;
`;


// Query to delete a user by ID
const DELETE_USER_BY_ID = `
  DELETE FROM users WHERE id = $1
  RETURNING *;
`;

module.exports = {
  CREATE_USER,
  GET_ALL_USERS,
  GET_USER_BY_ID,
  DELETE_USER_BY_ID,
  GET_USER_BY_EMAIL
};
