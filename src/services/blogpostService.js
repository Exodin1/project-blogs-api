const { BlogPosts, Categories, Users } = require('../models');

const create = async (title, content, categoryIds, userId) => {
  if (!title) return { status: 400, message: '"title" is required' };
  if (!content) return { status: 400, message: '"content" is required' };
  if (!categoryIds) return { status: 400, message: '"categoryIds" is required' };
  const categories = await Categories.findAll({ where: { id: categoryIds }, raw: true });
  if (categories.length !== categoryIds.length) {
    return { status: 400, message: '"categoryIds" not found' };
  }
  const createPost = await BlogPosts.create(title, content, categoryIds, userId);
  return createPost;
};

const getAll = async () => {
  const posts = await BlogPosts.findAll({
    include: [{ model: Users, as: 'user' },
    { model: Categories, as: 'categories' }],
  });
  return posts;
};

const postById = async (id) => {
  const [post] = await BlogPosts.findAll({
    include: [{ model: Users, as: 'user' },
    { model: Categories, as: 'categories' }],
    where: { id },
  });
  return post;
};

module.exports = { create, getAll, postById };
