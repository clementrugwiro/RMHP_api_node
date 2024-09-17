const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("../models/user");

// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;


// Login API
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await userModel.getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "THE EMAIL IS UNAVAILABLE" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Create JWT tokens
    const accessToken = jwt.sign(
      { id: user.id, role: user.role }, // Payload
      JWT_SECRET, // Secret key from environment
      { expiresIn: "15m" } // Access token expiration
    );

    const refreshToken = jwt.sign(
      { id: user.id }, // Payload
      REFRESH_SECRET, // Secret key for refresh tokens
      { expiresIn: "7d" } // Refresh token expiration
    );

    // Send tokens in the response
    res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token required" });
  }

  try {
    // Verify the refresh token
    const decoded = jwt.verify(refreshToken, REFRESH_SECRET);

    // Find the user by ID
    const user = await userModel.getUserById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    // Create new access token
    const newAccessToken = jwt.sign(
      { id: user.id, role: user.role }, // Payload
      JWT_SECRET, // Secret key from environment
      { expiresIn: "15m" } // New access token expiration
    );

    res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Invalid refresh token" });
  }
};

module.exports = { loginUser, refreshToken };
