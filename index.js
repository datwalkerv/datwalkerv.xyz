const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors')

app.use(cors({
  origin: '*'
}));

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(__dirname + '/public'));

io.on('connection', (socket) => {
  socket.on('disconnect', () => {
    io.emit('chat message', 'A user disconnected')
  });

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
