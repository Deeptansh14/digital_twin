const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve the static HTML file
app.use(express.static(path.join(__dirname, 'public')));

// Mock data for lights positions and radius
const lights = [
  { id: 0, x: 100, y: 100, radius: 150 },
  { id: 1, x: 300, y: 100, radius: 150 }
];

// Track which lights are on
const lightStatus = Array(12).fill(false);

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('benchClicked', ({ benchId, position }) => {
    let lightToTurnOn = null;

    // Determine which light should be turned on based on the clicked position
    lights.forEach(light => {
      const distance = Math.sqrt((position.x - light.x) ** 2 + (position.y - light.y) ** 2);
      if (distance <= light.radius && !lightStatus[light.id]) {
        lightToTurnOn = light.id;
      }
    });

    // If a light needs to be turned on, update its status and notify the frontend
    if (lightToTurnOn !== null) {
      lightStatus[lightToTurnOn] = true;
      io.emit('updateLight', { lightId: lightToTurnOn, status: true });
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(4000, () => {
  console.log('Server is running on port 4000');
});
