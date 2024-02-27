
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const config = require('../config/config');


// Absolute path of database file
const dbPath = path.resolve(__dirname, config.dbPath);

// SQLite database connection
const db = new sqlite3.Database(dbPath);

db.on('open', () => {
    console.log('Database connected successfully check done');
});

db.serialize(() => {
  // Create blogs table if not exists
  db.run("CREATE TABLE IF NOT EXISTS blogs (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, author TEXT, content TEXT)");
});

module.exports = db;
