// controllers/user.js
const userModel = require("../models/user");

// Create a new user
const createUser = async (req, res) => {
    console.log(req.body)
  try {
    const user = await userModel.createUser(req.body);
    res.status(201).json(user.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller function to get a user by ID
const getUserById = async (req, res) => {
  const { id } = req.params; // Get user ID from URL parameters
  try {
    const user = await userModel.getUserById(id);
    if (user.rows.length > 0) {
      res.status(200).json(user.rows[0]); // Send the user data as JSON response
    } else {
      res.status(404).json({ message: 'User not found' }); // User not found
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller function to get all users
const getAllUsers = async (req, res) => {
   
  try {
    const users = await userModel.getAllUsers();
    res.status(200).json(users.rows); // Send all user rows as JSON response
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller function to update a user by ID
const updateUser = async (req, res) => {
  const { id } = req.params; // Get user ID from URL parameters
  const updates = req.body; // Get updated data from request body

  try {
    // Call the model method to update the user
    const result = await userModel.updateUser(id, updates);

    if (result.rowCount > 0) {
      res.status(200).json({ message: 'User updated successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller function to delete a user by ID
const deleteUser = async (req, res) => {
  const { id } = req.params; // Get user ID from URL parameters

  try {
    const result = await userModel.deleteUser(id);

    if (result.rowCount > 0) {
      res.status(200).json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Other controller functions
module.exports={
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
}