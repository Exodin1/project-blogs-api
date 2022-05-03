const { create, getAll, postById } = require('../services/blogpostService');

const createPost = async (req, res) => {
  const { title, content, categoryIds, userId } = req.body;
  const { message, status, id } = await create(title, content, categoryIds, userId);
  if (message) return res.status(status).json({ message });
  res.status(201).json({ id, userId, title, content });
};

const getAllPosts = async (req, res) => {
  const all = await getAll();
  res.status(200).json(all);
};

const getbyId = async (req, res) => {
  const { id } = req.params;
  const post = await postById(id);
  if (!post) return res.status(404).json({ message: 'Post does not exist' });
  res.status(200).json(post);
};

module.exports = { createPost, getAllPosts, getbyId };