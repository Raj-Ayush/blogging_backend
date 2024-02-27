
const db = require('../db/db');

//
/**
 * Create a new blog entry
 * @param {String} title
 * @param {String} author
 * @param {String} content
 * @returns {Object}
 */
exports.createBlog = async (title, author, content) => {
  return new Promise((resolve, reject) => {
    const stmt = db.prepare("INSERT INTO blogs (title, author, content) VALUES (?, ?, ?)");
    stmt.run(title, author, content, (err) => {
      if (err) {
        reject('Failed to create blog entry');
      } else {
        resolve('Blog entry created successfully');
      }
    });
    stmt.finalize();
  });
};

/**
 * Get all blog entries
 * @returns {Array<Object>}
 */
exports.getAllBlogs = async () => {
  return new Promise((resolve, reject) => {
    db.all("SELECT id, title, author FROM blogs", (err, rows) => {
      if (err) {
        reject('Failed to fetch blog entries');
      } else {
        resolve(rows);
      }
    });
  });
};

/**
 * Get blog details based on id
 * @param {String} id 
 * @returns {Object}
 */
exports.getBlogById = async (id) => {
  return new Promise((resolve, reject) => {
    const stmt = db.prepare("SELECT * FROM blogs WHERE id = ?");
    stmt.get(id, (err, row) => {
      if (err) {
        reject('Failed to fetch blog entry');
      } else if (!row) {
        reject('Blog entry not found');
      } else {
        resolve(row);
      }
    });
    stmt.finalize();
  });
};


/**
 * Update a blog object based on id
 * @param {String} id
 * @param {String} title
 * @param {String} author
 * @param {String} content
 * @returns {String}
 */
exports.updateBlog = async (id, title, author, content) => {
  return new Promise((resolve, reject) => {
    const stmt = db.prepare("UPDATE blogs SET title = ?, author = ?, content = ? WHERE id = ?");
    stmt.run(title, author, content, id, (err) => {
      if (err) {
        reject('Failed to update blog entry');
      } else {
        resolve('Blog entry updated successfully');
      }
    });
    stmt.finalize();
  });
};


/**
 * delete a blog entry by ID
 * @param {String} id
 * @returns {String}
 */
exports.deleteBlog = async (id) => {
  return new Promise((resolve, reject) => {
    const stmt = db.prepare("DELETE FROM blogs WHERE id = ?");
    stmt.run(id, (err) => {
      if (err) {
        reject('Failed to delete blog entry');
      } else {
        resolve('Blog entry deleted successfully');
      }
    });
    stmt.finalize();
  });
};
