const express = require('express');
const next = require('next');
const morgan = require('morgan');
const dotenv = require('dotenv');
const path = require('path');

const dev = process.env.NODE_ENV !== 'production';
const prod = process.env.NODE_ENV === 'production';

const app = next({ dev });
const handle = app.getRequestHandler();
dotenv.config();

app.prepare().then(() => {
  const server = express();
  server.use(morgan('dev'));
  server.use('/', express.static(path.join(__dirname, 'images')));
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));

  server.get('/hashtag/:tag', (req, res) => app.render(req, res, '/hashtag', { tag: req.params.tag }));
  server.get('/search/:text', (req, res) => app.render(req, res, '/search', { text: req.params.text }));
  server.get('/user/:id', (req, res) => app.render(req, res, '/user', { id: req.params.id }));
  server.get('*', (req, res) => handle(req, res));
  server.listen(80, () => {
    console.log('next+express running on port 80');
  });
});
