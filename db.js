const { Pool } = require("pg");

// Create a new pool instance with the PostgreSQL database connection configuration
const pool = new Pool({
  user: "postgres", // Username for PostgreSQL
  host: "localhost", // Host where the PostgreSQL server is running
  database: "rmhp", // Database name you want to connect to
  password: "RwandaMedical", // Password for the PostgreSQL user
  port: 5432, // Port number where PostgreSQL is listening
});

// Export the pool instance for use in other parts of the application
module.exports = pool;
