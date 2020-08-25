const bodyParser = require('body-parser');
require('dotenv').config();
const path = require('path')
const cors = require('cors');
const express = require('express');
const app = express();

const routes = require('./routes/index');
const paths = require('./routes/paths');
const config = require('./config');
const pool = require('./db/queries');


app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(paths.api, routes);
app.use(express.static(path.join(__dirname)));  // , 'client/build'

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
});

// app.use(express.static(__dirname + '/client/build'));

const port = process.env.PORT || 9000;  
app.listen(port);

module.exports = app;
