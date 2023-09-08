const Room = require('../models/room.model')
const { model: User } = require('../models/user.model')
var mongoose = require('mongoose')

const joinRoomService = async (req, res) => {
  const { username, roomId } = req.body
  let id = mongoose.Types.ObjectId(roomId)
  const user = await User.findOne({ username: username })
  try {
    const room = await Room.findOne({ _id: id })
    if (room.length === 0) throw new Error('Room not found')
    if (
      room.members.length < 8
      // &&
      // !room.members.find((members) => members.username === username)
    ) {
      await Room.findOneAndUpdate({ _id: id }, { $push: { members: user } })
      res.status(200).json({
        status: 'ok'
      })
    } else {
      throw new Error('Room is at capacity')
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ err: err.message })
  }
}

module.exports = {
  joinRoomService
}
