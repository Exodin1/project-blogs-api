const { finalValidation, userExist, loginValidation, getUser } = require('../services/userService');
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

const login = async (request, response) => {
  const { email, password } = request.body;
  const { token, status, message } = await loginValidation(email, password);
  if (message) return response.status(status).json({ message });
  return response.status(200).json({ token });
};

const getAll = async (request, response) => {
  const users = await Users.findAll();
  return response.status(200).json(users);
};

const $getUser = async (request, response) => {
  const { id } = request.params;
  const user = await getUser(id);
  if (!user) return response.status(404).json({ message: 'User does not exist' });
  return response.status(200).json(user);
};

module.exports = { create, login, getAll, $getUser };