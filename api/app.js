require('dotenv').config();
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const app = express();


if (process.env.NODE_ENV === 'test') {
  const process = require('process');
  process.chdir(process.env.NODE_PATH);
}


const routes = require(path.resolve('routes/index.js'));
const paths = require(path.resolve('routes/paths.js'));


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
