const express = require('express');
const bodyParser = require('body-parser');
// const rescue = require('express-rescue');
const { create, login } = require('./controllers/userController');
// const { login } = require('./services/userService');

const app = express();
const PORT = 3000 || process.env.PORT;
app.use(bodyParser.json());
app.listen(PORT, () => console.log('Server is running on port', PORT));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/user', create);
app.post('/login', login);
// app.get('/user/');
// app.post('/user/:id');
// app.post('/categories');
// app.get('/categories');
// app.post('/post');
// app.get('/post');
// app.get('/post/:id');
// app.put('/post/:id');
