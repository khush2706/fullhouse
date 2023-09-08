const { model: User } = require('../models/user.model')
const { redisClient } = require('../redis.config')

const joinQueueService = async (req, res) => {
  const { username, queueId } = req.body
  const user = await User.findOne({ username: username })
  try {
    await redisClient.json.ARRAPPEND(queueId, '.members', user)
    res.status(200).json({
      status: 'ok'
    })
  } catch (err) {
    console.log(err.message)
    res.status(500).json({ err: err.message })
  }
}

module.exports = {
  joinQueueService
}
