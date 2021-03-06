const JWT = require('jsonwebtoken');
const express = require('express');
const bodyParser = require('body-parser');
const { create, login, getAll, $getUser } = require('./controllers/userController');
const { createCategory, $getall } = require('./controllers/categorieController');
const { createPost, getAllPosts, getbyId } = require('./controllers/blogpostController');

const app = express();
const PORT = 3000 || process.env.PORT;
app.use(bodyParser.json());
app.listen(PORT, () => console.log('Server is running on port', PORT));

app.get('/', (_request, response) => {
  response.send();
});
app.post('/user', create);
app.post('/login', login);
app.use((request, response, next) => {
  const token = request.headers.authorization;
  if (!token) return response.status(401).json({ message: 'Token not found' });
  try {
    const { id } = JWT.verify(token, process.env.JWT_SECRET);
    request.body = { userId: id, ...request.body };
    next();
  } catch (error) {
    return response.status(401).json({ message: 'Expired or invalid token' });
  }
});
app.get('/user', getAll);
app.get('/user/:id', $getUser);
app.post('/categories', createCategory);
app.get('/categories', $getall);
app.post('/post', createPost);
app.get('/post', getAllPosts);
app.get('/post/:id', getbyId);
// app.put('/post/:id');
