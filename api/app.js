var bodyParser = require('body-parser');
var routes = require('./routes');
var cors = require("cors");
var express = require('express');
var app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api', routes);

app.listen(9000, async () => {
  console.log('Server ready!')
})

module.exports = app;
