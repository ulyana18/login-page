require('dotenv').config();
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

if (process.env.NODE_ENV === 'test') {
  const process = require('process');
  process.chdir(process.env.NODE_PATH);
}

const routes = require('routes/index');
const paths = require('routes/paths');


app.use(cors());
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(paths.api, routes);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 9000;

io.on('connection', socket => {
  const { id } = socket.client;
  console.log(`User connected: ${id}`);
  socket.on("chat message", (msg, name, email) => {
    console.log(`${email}: ${msg}`);
    io.emit("chat message", { msg, name, email });
  });
});

server.listen(port);

module.exports = app;
