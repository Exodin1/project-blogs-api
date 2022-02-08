const JWT = require('jsonwebtoken');
const { Users } = require('../models');

const nameValidation = async (displayName) => {
  if (displayName.length < 8) {
    return { status: 400, message: '"displayName" length must be at least 8 characters long' };
  }
};

const emailValidation = async (email) => {
  if (!email) {
    return { status: 400, message: '"email" is required' };
  }
  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(email)) {
    return { status: 400, message: '"email" must be a valid email' };
  }
  return false;
};

const passwordValidation = async (password) => {
  if (!password) {
    return { status: 400, message: '"password" is required' };
  }
  if (password.length < 6) {
    return { status: 400, message: '"password" length must be 6 characters long' };
  }
  return false;
};

const userExist = async (email) => {
  const user = await Users.findOne({ where: { email } });
  return user;
};

const generateToken = (data) => JWT.sign(data, process.env.JWT_SECRET, {
  algorithm: 'HS256',
  expiresIn: '31d',
});

const tokenValidation = (token) => {
  if (!token) return { status: 401, message: 'Token not found' };
  JWT.verify(token, process.env.JWT_SECRET);
};

const getAll = async () => {
  const users = await Users.findAll();
  return users;
};

const finalValidation = async (displayName, email, password) => {
  const nameError = await nameValidation(displayName);
  const emailError = await emailValidation(email);
  const passwordError = await passwordValidation(password);
  if (nameError) return nameError;
  if (emailError) return emailError;
  if (passwordError) return passwordError;
};

const loginEmail = (email) => {
  if (!email && email !== '') return { status: 400, message: '"email" is required' };
  if (email === '') return { status: 400, message: '"email" is not allowed to be empty' };
};

const loginPassword = (password) => {
  if (!password && password !== '') return { status: 400, message: '"password" is required' };
  if (password === '') return { status: 400, message: '"password" is not allowed to be empty' };
};

const loginValidation = async (email, password) => {
  const emailError = await loginEmail(email);
  const passwordError = await loginPassword(password);
  if (emailError) return emailError;
  if (passwordError) return passwordError;
  const user = await userExist(email);
  if (!user) return { status: 400, message: 'Invalid fields' };
  const token = generateToken(user.dataValues);
  return { status: 200, token };
};

const getUser = async (id) => {
  const user = await Users.findByPk(id);
  return user;
};

module.exports = {
  userExist,
  finalValidation,
  loginValidation,
  generateToken,
  tokenValidation,
  getAll,
  getUser,
};