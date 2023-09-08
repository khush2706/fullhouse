const playVideo = (socket, io) => {
  socket.on('play_video', ({ roomId }) => {
    console.log('played')
    io.to(roomId).emit('play_video', {})
  })
}

const pauseVideo = (socket, io) => {
  socket.on('pause_video', ({ roomId }) => {
    console.log('paused')
    io.to(roomId).emit('pause_video', {})
  })
}

const songStarted = (socket) => {
  socket.on('song_started', ({ roomId }) => {
    socket.emit('video_seek', {})
  })
}

const songAdded = (socket, io) => {
  socket.on('added_song', ({ roomId, songInfo }) => {
    io.in(roomId).emit('song_added', {
      songInfo
    })
  })
}

module.exports = { playVideo, pauseVideo, songStarted, songAdded }
