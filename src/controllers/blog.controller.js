

const blogService = require('../services/blogService');

/**
 * Create a new blog entry
 * @param {Request} req
 * @param {Response} res
 */
exports.createBlog = async (req, res) => {
  const { title, author, content } = req.body;
  try {
    const message = await blogService.createBlog(title, author, content);
    res.status(201).json({ message });
  } catch (error) {
    res.status(500).json({ error });
  }
};

/**
 * Create a new blog entry
 * @param {Request} req
 * @param {Response} res
 */
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await blogService.getAllBlogs();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error });
  }
};

/**
 * Get blog by Id
 * @param {Request} req
 * @param {Response} res
 */
exports.getBlogById = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await blogService.getBlogById(id);
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error });
  }
};

/**
 * Update the blog
 * @param {Request} req
 * @param {Response} res
 */
exports.updateBlog = async (req, res) => {
  const { id } = req.params;
  const { title, author, content } = req.body;
  try {
    const message = await blogService.updateBlog(id, title, author, content);
    res.json({ message });
  } catch (error) {
    res.status(500).json({ error });
  }
};

/**
 * Delete a blog post
 * @param {Request} req
 * @param {Response} res
 */
exports.deleteBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const message = await blogService.deleteBlog(id);
    res.json({ message });
  } catch (error) {
    res.status(500).json({ error });
  }
};
