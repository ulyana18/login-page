const bodyParser = require('body-parser');
require('dotenv').config();
const routes = require('../api/routes/index');
const cors = require('cors');
const express = require('express');
const app = express();
const path = {
  api: '/api',
}

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(path.api, routes);

const port = process.env.PORT || 9000;
app.listen(port);

module.exports = app;