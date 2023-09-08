const Joi = require('@hapi/joi')
const { addSongService } = require('../services/dash.addSong.service')

const addSongValidation = async (req, res) => {
  const schema = Joi.object({
    username: Joi.string().min(6).max(255).required(),
    queueId: Joi.string().min(42).max(42).required(),
    songTitle: Joi.string().required(),
    channelName: Joi.string().required(),
    thumbnailUrl: Joi.string().required(),
    videoId: Joi.string().required()
  })

  //validate the room
  const validation = schema.validate(req.body)

  // throw validation errors
  if (validation.error) {
    return res.status(400).json({ error: validation.error.details[0].message })
  }

  addSongService(req, res)
}

module.exports = {
  addSongValidation
}
