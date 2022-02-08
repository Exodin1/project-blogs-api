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

const finalValidation = async (displayName, email, password) => {
  const nameError = await nameValidation(displayName);
  const emailError = await emailValidation(email);
  const passwordError = await passwordValidation(password);
  if (nameError) return nameError;
  if (emailError) return emailError;
  if (passwordError) return passwordError;
};

// quero fazer um post na rota /login
// o corpo da requisição deve ser { email, password }
// Caso algum desses campos seja inválido ou não exista um usuário correspondente no banco de dados, retorne um código de status 400 com o corpo { message: "Invalid fields" }
// Caso esteja tudo certo com o login, a resposta deve ser um token JWT

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
  console.log(user);
  if (!user) return { status: 400, message: 'Invalid fields' };
  const token = generateToken(user.dataValues);
  console.log(token);
  return { status: 200, token };
};

module.exports = {
  userExist,
  finalValidation,
  loginValidation,
  generateToken,
};