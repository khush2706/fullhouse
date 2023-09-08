const Room = require('../models/room.model')

const getRoomsService = async (req, res) => {
  function selectFewerProps(room) {
    const { _id, name, description, createdBy, members } = room
    const creator = createdBy
    const noOfMembers = members.length
    return { _id, name, description, creator, noOfMembers }
  }
  try {
    const rooms = await Room.find({ isPublic: true })
    if (rooms.length > 0) {
      const roomsData = rooms.map(selectFewerProps)
      res.status(200).json({
        status: 'ok',
        data: {
          roomsData
        }
      })
    } else {
      throw new Error('No rooms found')
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ err: err.message })
  }
}

module.exports = {
  getRoomsService
}
