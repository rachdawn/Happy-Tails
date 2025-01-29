const { Pool } = require('pg');

const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  // ssl: { // Important for Neon!
  //   rejectUnauthorized: false, // For development. In production, get a proper cert.
  // },
});

// Optional: Test the connection (good practice)
db.connect()
  .then(() => console.log("Connected to PostgreSQL database"))
  .catch(err => console.error("Error connecting to PostgreSQL:", err));


module.exports = db;

