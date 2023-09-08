const { redisClient } = require('../redis.config')

const getQueueService = async (req, res) => {
  const { queueId } = req.params
  try {
    const queue = await redisClient.json.get(queueId, '.')
    res.status(200).json({
      status: 'ok',
      data: {
        songs: queue.songs,
        members: queue.members
      }
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ err: 'Something went wrong' })
  }
}

module.exports = {
  getQueueService
}
