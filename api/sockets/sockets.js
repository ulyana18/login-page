const pool = require('db/queries');
let sockets = {};

sockets.init = function (server) {

  const io = require('socket.io')(server);

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

}

module.exports = sockets;
