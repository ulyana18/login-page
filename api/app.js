require('dotenv').config();
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const app = express();
const server = require('http').Server(app);

if (process.env.NODE_ENV === 'test') {
  const process = require('process');
  process.chdir(process.env.NODE_PATH);
}

const routes = require('routes/index');
const paths = require('routes/paths');
const sockets = require('sockets/sockets');


app.use(cors());
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(paths.api, routes);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

sockets.init(server);

const port = process.env.PORT || 9000;

server.listen(port);

module.exports = app;
