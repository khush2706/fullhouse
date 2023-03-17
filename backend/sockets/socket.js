const { joinRoom, createRoom, sendMessage } = require('./roomSockets')

const socketHandler = (io) => {
    return io.on('connection', (socket) => {
      console.log('testing');
      console.log(`User connected ${socket.id}`);
      joinRoom(socket);
      createRoom(socket);
      sendMessage(socket, io);
    }
)}

  module.exports = { socketHandler };