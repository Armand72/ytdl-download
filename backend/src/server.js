const express = require('express');
const parser = require('body-parser');

const app = express();
const cors = require('cors');
const path = require('path');
const server = require('http').createServer(app);
const api = require('./routes');

// require('./src/routes/__test__/node_modules/dotenv').config();

app.use(parser.json());

app.use(
  parser.urlencoded({
    extended: true,
  }),
);
app.use(cors());
app.use('/api', api);

const PORT = process.env.PORT || 8000;

// Heroku deployment
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, './client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './client/build/index.html'));
  });
}

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`server is listening on port ${PORT}`);
});

module.exports = server;
