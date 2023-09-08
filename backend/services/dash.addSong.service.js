const { redisClient } = require('../redis.config')

const addSongService = async (req, res) => {
  const { username, queueId, songTitle, channelName, thumbnailUrl, videoId } = req.body
  try {
    await redisClient.json.ARRAPPEND(queueId, '.songs', {
      songTitle,
      channelName,
      thumbnailUrl,
      videoId,
      addedBy: username
    })
    res.status(200).json({
      status: 'ok'
    })
  } catch (err) {
    console.log(err.message)
    res.status(500).json({ err: err.message })
  }
}

module.exports = {
  addSongService
}
