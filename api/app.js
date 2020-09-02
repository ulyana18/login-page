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
const pool = require('db/queries');


app.use(cors());
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(paths.api, routes);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 9000;

io.on('connection', async socket => {
  const { id } = socket.client;
  console.log(`User connected: ${id}`);

  socket.on('chat message', async (message, name, email) => {
    console.log(`${email}: ${message}`);

    await pool.query('INSERT INTO chat (message, name, email) VALUES ($1, $2, $3)',
      [message, name, email]
    );

    io.emit('chat message', { message, name, email });
  });
  
  socket.on('get database', async () => {
    const result = await pool.query('SELECT * FROM chat');
    io.emit('get database', result.rows);
  });
});

server.listen(port);

module.exports = app;
