const { joinRoom, createRoom, sendMessage } = require('./roomSockets')
const { playVideo, pauseVideo, songStarted, songAdded } = require('./playlistSockets')

const socketHandler = (io) => {
  return io.on('connection', (socket) => {
    console.log(`User connected ${socket.id}`)
    joinRoom(socket)
    createRoom(socket)
    sendMessage(socket, io)
    playVideo(socket, io)
    pauseVideo(socket, io)
    songStarted(socket)
    songAdded(socket, io)
  })
}

module.exports = { socketHandler }
