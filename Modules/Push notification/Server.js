const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


const connectedDrivers = {}; //storage?

io.on('connection', (socket) => {
  console.log('A driver connected:', socket.id);

 
  socket.on('register', (driverId) => {
    connectedDrivers[driverId] = socket.id;
    console.log(`Driver ${driverId} registered`);
  });

  
  socket.on('sendNotification', (data) => {
    const { driverId, message } = data;
    const recipientSocketId = connectedDrivers[driverId];

    if (recipientSocketId) {
      io.to(recipientSocketId).emit('notification', message);
      console.log(`Notification sent to Driver ${driverId}: ${message}`);
    } else {
      console.log(`Driver ${driverId} not found or not connected`);
    }
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    // Remove the driver from the connectedDrivers object on disconnect
    Object.keys(connectedDrivers).forEach((driverId) => {
      if (connectedDrivers[driverId] === socket.id) {
        delete connectedDrivers[driverId];
        console.log(`Driver ${driverId} disconnected`);
      }
    });
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
