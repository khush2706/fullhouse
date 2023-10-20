const { redisClient } = require('../redis.config')

const removeTopSongService = async (req, res) => {
  const { queueId } = req.body
  try {
    await redisClient.json.ARRPOP(queueId, '.songs', 0)
    res.status(200).json({
      status: 'ok'
    })
  } catch (err) {
    console.log(err.message)
    res.status(500).json({ err: err.message })
  }
}

module.exports = {
  removeTopSongService
}
