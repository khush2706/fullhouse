const { joinRoom, createRoom } = require('./roomSockets')

const socketHandler = (io) => {
    return io.on('connection', (socket) => {
      console.log('testing');
      console.log(`User connected ${socket.id}`);
      joinRoom(io);
      createRoom(io);
    }
)}

  module.exports = { socketHandler };