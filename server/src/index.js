import { createServer } from 'http';
import { Server } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

const availableColors = ['#e98888', '#8be78b', '#8989df', '#d4d488', '#85b5e8'];
const usedColors = new Map();

function getUniqueColor(userId) {
  if (usedColors.has(userId)) return usedColors.get(userId);

  const index = Math.floor(Math.random() * availableColors.length);
  const color = availableColors.splice(index, 1)[0];
  usedColors.set(userId, color);

  return color;
}

io.use((socket, next) => {
  const username = socket.handshake.auth.username;
  if (!username) {
    return next(new Error('invalid username'));
  }

  socket.username = username;
  socket.userId = uuidv4();
  socket.color = getUniqueColor(socket.userId);

  next();
});

io.on('connection', (socket) => {
  const users = [];

  for (let s of io.of('/').sockets.values()) {
    users.push({
      userId: s.userId,
      username: s.username,
      color: s.color,
    });
  }

  socket.emit('users', users);

  socket.emit('session', {
    userId: socket.userId,
    username: socket.username,
    color: socket.color,
  });

  socket.broadcast.emit('user connected', {
    userId: socket.userId,
    username: socket.username,
    color: socket.color,
  });

  socket.on('new message', (message) => {
    socket.broadcast.emit('new message', {
      userId: socket.userId,
      username: socket.username,
      message,
      color: socket.color,
    });
  });
});

httpServer.listen(process.env.PORT || 4000);
