const JWT = require('jsonwebtoken');
const express = require('express');
const bodyParser = require('body-parser');
const { create, login, getAll } = require('./controllers/userController');

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
    JWT.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    return response.status(401).json({ message: 'Expired or invalid token' });
  }
});
app.get('/user', getAll);
// app.post('/user/:id');
// app.post('/categories');
// app.get('/categories');
// app.post('/post');
// app.get('/post');
// app.get('/post/:id');
// app.put('/post/:id');
