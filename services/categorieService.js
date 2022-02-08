const { Categories } = require('../models');

const create = async (name) => {
  if (!name) return { status: 400, message: '"name" is required' };
  const createdCategory = await Categories.create({ name });
  return { status: 201, createdCategory };
};

module.exports = {
  create,
};