const joinRoom = (socket) => {
  socket.on('join_room', ({ roomId, username }) => {
    socket.join(roomId)
    socket.to(roomId).emit('user_joined', {
      username: username,
      message: `${username} has joined the room`
    })
  })
}

const createRoom = (socket, io) => {
  socket.on('create_room', ({ roomId, room_name, room_description }) => {
    io.emit('room_created', {
      roomId,
      room_name,
      room_description
    })
  })
}

const sendMessage = (socket, io) => {
  socket.on('send_message', ({ roomId, user, msg }) => {
    io.in(roomId).emit('receive_message', {
      user,
      msg
    })
  })
}

module.exports = { joinRoom, createRoom, sendMessage }
