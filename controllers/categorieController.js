const { create } = require('../services/categorieService');

const createCategory = async (req, res) => {
  const { name } = req.body;
  const { status, createdCategory, message } = await create(name);
  if (message) return res.status(status).json({ message });
  res.status(status).json(createdCategory);
};

module.exports = { createCategory };