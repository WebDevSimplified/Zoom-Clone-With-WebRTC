const fs = require('fs');
const express = require('express');
const app = express();
const https = require('https');

const { v4: uuidV4 } = require('uuid');

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.redirect(`/${uuidV4()}`);
});

app.get('/:room', (req, res) => {
  res.render('room', { roomId: req.params.room });
});

server = https.createServer(
  {
    key: fs.readFileSync('private.pem'),
    cert: fs.readFileSync('public.pem'),
  },
  app
);
const io = require('socket.io')(server);
io.on('connection', (socket) => {
  socket.on('join-room', (roomId, userId) => {
    socket.join(roomId);
    socket.to(roomId).broadcast.emit('user-connected', userId);

    socket.on('disconnect', () => {
      socket.to(roomId).broadcast.emit('user-disconnected', userId);
    });
  });
});

server.listen(3333, '0.0.0.0');
