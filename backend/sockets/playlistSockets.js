const playVideo = (socket, io) => {
  socket.on("play_video", ({ roomId }) => {
    console.log("played");
    io.to(roomId).emit("play_video", {});
  });
};

const pauseVideo = (socket, io) => {
  socket.on("pause_video", ({ roomId }) => {
    console.log("paused");
    io.to(roomId).emit("pause_video", {});
  });
};

const songStarted = (socket) => {
  socket.on("song_started", ({ roomId }) => {
    socket.emit("video_seek", {})
  });
};

module.exports = { playVideo, pauseVideo, songStarted };
