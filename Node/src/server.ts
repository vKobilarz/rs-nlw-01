import express from 'express';

const app = express();

app.get('/users', (req, res) => {
  res.json(['Vinicius', 'Freitas', 'Kobilarz']);
});

app.listen(3333);
