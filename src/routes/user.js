const { Router } = require("express");
const userController = require("../controllers/user"); // Adjust the path if necessary
const authenticate = require("../middlewares/authmiddleware");
const authorize = require("../middlewares/authorize");

const router = Router();

// Create a new user
router.post("/", userController.createUser);

// Get all users
router.get("/", userController.getAllUsers);

// Get a single user by ID
router.get("/:id",authenticate,authorize(['admin','editor']), userController.getUserById);

// Update a user by ID
router.put("/:id", userController.updateUser);

// Delete a user by ID
router.delete("/:id", userController.deleteUser);

module.exports = router;
