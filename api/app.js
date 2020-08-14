var bodyParser = require('body-parser');
const ROUTES = require('/Users/ulyana/Documents/login-page/login-page/api/routes/index');
var cors = require('cors');
var express = require('express');
var app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api', ROUTES);

const port = process.env.PORT || 9000;
app.listen(port);

module.exports = app;
