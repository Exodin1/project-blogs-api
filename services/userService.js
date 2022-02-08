// const JWT = require('jsonwebtoken');
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

const finalValidation = async (displayName, email, password) => {
  const nameError = await nameValidation(displayName);
  const emailError = await emailValidation(email);
  const passwordError = await passwordValidation(password);
  if (nameError) return nameError;
  if (emailError) return emailError;
  if (passwordError) return passwordError;
};

module.exports = {
  userExist,
  finalValidation,
};