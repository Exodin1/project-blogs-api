const { finalValidation, userExist } = require('../services/userService');
const { Users } = require('../models');

const create = async (request, response) => {
  const { displayName, email, password, image } = request.body;
  const validation = await finalValidation(displayName, email, password, image);
  if (validation) return response.status(validation.status).json({ message: validation.message });
  const user = await userExist(email);
  if (user) return response.status(409).json({ message: 'User already registered' });
  const newUser = await Users.create({ displayName, email, password, image });
  return response.status(201).json(newUser);
};

module.exports = { create };