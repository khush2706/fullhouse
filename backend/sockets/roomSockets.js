const joinRoom = (io) => {
  return io.on("connection", (socket) => {
    socket.on("join_room", (room_id, username) => {
      console.log("joined");
      socket.join(room_id);
      socket.to(room_id).emit("user_joined", {
        username: username,
        message: `${username} has joined the room`,
      });
    });
  });
};

const createRoom = (io) => {
  return io.on("connection", (socket) => {
    socket.on("create_room", (room_id, room_name, room_description) => {
      io.emit("room_created", {
        room_id,
        room_name,
        room_description,
      });
    });
  });
};
 
module.exports = { joinRoom, createRoom }