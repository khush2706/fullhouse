const playVideo = (socket, io) => {
  socket.on('play_video', ({ roomId }) => {
    io.to(roomId).emit('video_play', {})
  })
}

const pauseVideo = (socket, io) => {
  socket.on('pause_video', ({ roomId }) => {
    io.to(roomId).emit('video_pause', {})
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

const songEnded = (socket, io) => {
  socket.on('song_ended', ({ roomId }) => {
    io.in(roomId).emit('ended_song', {})
  })
}

module.exports = { playVideo, pauseVideo, songStarted, songAdded, songEnded }
