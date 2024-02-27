const express = require('express');
const bodyParser = require('body-parser');
const db = require('./connection/db');
const config = require('./config/config');

const app = express();
const PORT = config.port || 5000;



// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/blogs', routes);

// Start server
app.listen(PORT, async () => {
    // Execute a simple query to trigger the database connection
    db.get("SELECT 1", (err, row) => {
      if (err) {
        console.error('Database connection error:', err.message);
      } else {
        console.log('Database connected successfully');
      }
    });
    console.log(`Server is running on port ${PORT}`);
});