const { create, getAll } = require('../services/categorieService');

const createCategory = async (req, res) => {
  const { name } = req.body;
  const { status, createdCategory, message } = await create(name);
  if (message) return res.status(status).json({ message });
  res.status(status).json(createdCategory);
};

const $getall = async (req, res) => {
  const categories = await getAll();
  res.status(200).json(categories);
};

module.exports = { createCategory, $getall };