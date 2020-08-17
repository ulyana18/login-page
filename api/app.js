const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();

const routes = path.resolve('/routes');
// const routes = require('../api/routes/index');
const paths = path.resolve('/routes/paths');
// const paths = require('./routes/paths');

app.use(cors());
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(paths.api, routes);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 9000;
app.listen(port);

module.exports = app;
