const jwt = require("jsonwebtoken");

// Authorization middleware
const authorize = (requiredRoles = []) => {
  // Ensure that roles are in array format
  if (typeof requiredRoles === "string") {
    requiredRoles = [requiredRoles];
  }

  return (req, res, next) => {
    const token = req.headers["authorization"];

    // Check if token is provided
    if (!token) {
      return res
        .status(403)
        .json({ message: "Access denied. No token provided." });
    }

    // Verify the token
    jwt.verify(token.split(" ")[1], process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Invalid or expired token." });
      }

      // Attach user info to request
      req.user = decoded;

      // Check if user's role matches the required roles
      const userRole = decoded.role; // Assume role is stored in token
      if (requiredRoles.length && !requiredRoles.includes(userRole)) {
        return res
          .status(403)
          .json({
            message: "Access denied. You do not have the required privileges.",
          });
      }

      next();
    });
  };
};

module.exports = authorize;
