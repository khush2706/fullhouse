const Room = require('../models/room.model')
const { model: User } = require('../models/user.model')
const { v4: uuidv4 } = require('uuid')
const { redisClient } = require('../redis.config')

const createRoomService = async (req, res) => {
  const { username, name, isPublic, description } = req.body
  const user = await User.findOne({ username: username })
  const queueId = `queue:${uuidv4()}`
  console.log(queueId)
  try {
    // const newQueue = await Queue.create({});
    await redisClient.json.set(queueId, '.', {
      _id: queueId,
      songs: [],
      members: []
    })
    const value = await redisClient.json.get(queueId)

    console.log(`value of playlist: ${JSON.stringify(value)}`)
    const newRoom = await Room.create({
      name: name,
      description: description,
      isPublic: isPublic,
      createdBy: username,
      members: [user],
      queue: queueId
    })
    res.status(201).json({
      status: 'ok',
      data: {
        roomId: newRoom._id
      }
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ err: 'Error! Cannot create room' })
  }
}

module.exports = {
  createRoomService
}
