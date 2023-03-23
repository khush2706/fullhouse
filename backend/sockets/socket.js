const { joinRoom, createRoom, sendMessage } = require("./roomSockets");
const { playVideo, pauseVideo, songStarted } = require("./playlistSockets");

const socketHandler = (io) => {
  return io.on("connection", (socket) => {
    console.log("testing");
    console.log(`User connected ${socket.id}`);
    joinRoom(socket);
    createRoom(socket);
    sendMessage(socket, io);
    playVideo(socket, io);
    pauseVideo(socket, io);
    songStarted(socket);
  });
};

module.exports = { socketHandler };
