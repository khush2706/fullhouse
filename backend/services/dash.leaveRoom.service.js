const Room = require('../models/room.model')
const { model: User } = require('../models/user.model')
var mongoose = require('mongoose')

const leaveRoomService = async (req, res) => {
  const { username, roomId } = req.body
  let id = mongoose.Types.ObjectId(roomId)
  const user = await User.findOne({ username: username })
  try {
    const room = await Room.findOne({ _id: id })
    if (room.length === 0) throw new Error('Room not found')
    await Room.findOneAndUpdate({ _id: id }, { $pull: { members: {_id: user._id} } })
    res.status(200).json({
      status: 'ok'
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ err: err.message })
  }
}

module.exports = {
  leaveRoomService
}
