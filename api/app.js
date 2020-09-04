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

  socket.on('chat message', async (message, name, email) => {
    let messageid;
    await pool.query('INSERT INTO chat (message, name, email, is_edited) VALUES ($1, $2, $3, $4)',
      [message, name, email, false],
      (err, res) => {
        messageid = { res };
      }
    );
    io.emit('chat message', { message, name, email, messageid });
  });

  socket.on('edit message', async (message, messageid) => {
    await pool.query('UPDATE chat SET message=($1), is_edited=($2) WHERE messageid=($3)',
      [message, true, messageid]
    );

    io.emit('edit message', { message, messageid, isEdited: true });
  });

  socket.on('delete message', async (messageid) => {
    await pool.query('DELETE FROM chat WHERE messageid=($1)',
      [messageid]
    );

    io.emit('delete message', messageid);
  });
  
  socket.on('get database', async () => {
    const result = await pool.query('SELECT * FROM chat');
    io.emit('get database', result.rows);
  });

});

server.listen(port);

module.exports = app;
