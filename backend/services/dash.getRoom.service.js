const Room = require('../models/room.model')
var mongoose = require('mongoose')

const getRoomService = async (req, res) => {
  const { roomId } = req.params
  var id = mongoose.Types.ObjectId(roomId)
  try {
    const room = await Room.findOne({ _id: id })
    let members = room.members.map(({ username }) => username)
    res.status(200).json({
      status: 'ok',
      data: {
        roomId: room._id,
        name: room.name,
        createdBy: room.createdBy,
        members,
        queue: room.queue
      }
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ err: 'Room not found' })
  }
}

module.exports = {
  getRoomService
}
