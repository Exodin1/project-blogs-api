const { create } = require('../services/blogpostService');

const createPost = async (req, res) => {
  const { title, content, categoryIds, userId } = req.body;
  const { message, status, id } = await create(title, content, categoryIds, userId);
  if (message) return res.status(status).json({ message });
  res.status(201).json({ id, userId, title, content });
};

module.exports = { createPost };