const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

// Use CORS middleware for Express
app.use(cors());

// Update Socket.IO initialization to include CORS settings
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3000',  // Allow requests from this origin
    methods: ['GET', 'POST'],         // Allow these HTTP methods
    allowedHeaders: ['Content-Type'], // Allow these headers
    credentials: true                 // Allow credentials (cookies, etc.)
  }
});

const baseToOverlayMap = {
  1: 'A', 2: 'A', 3: 'A', 4: 'A', 13: 'A', 14: 'A', 15: 'A', 16: 'A',
  5: 'B', 6: 'B', 7: 'B', 8: 'B', 17: 'B', 18: 'B', 19: 'B', 20: 'B',
  9: 'C', 10: 'C', 11: 'C', 12: 'C', 21: 'C', 22: 'C', 23: 'C', 24: 'C',
  25:'D', 26:'D', 27:'D', 28:'D', 29:'E', 30:'E', 31:'E', 32:'E', 33:'F', 34:'F', 35:'F', 36:'F',
  37:'G', 38:'G', 39:'G', 40:'G', 41:'H', 42:'H', 43:'H', 44:'H', 45:'I', 46:'I', 47:'I', 48:'I',
  49:'J', 50:'J', 51:'J', 52:'J', 53:'K', 54:'K', 55:'K', 56:'K', 57:'L', 58:'L', 59:'L', 60:'L',
};

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('benchClicked', ({ benchId }) => {
    const overlayId = baseToOverlayMap[benchId];
    io.emit('updateLight', { lightId: overlayId, status: true });
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(4000, () => {
  console.log('Server is running on port 4000');
});
