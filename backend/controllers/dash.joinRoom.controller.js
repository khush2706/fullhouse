const Joi = require('@hapi/joi')
const { joinRoomService } = require('../services/dash.joinRoom.service')

const joinRoomValidation = async (req, res) => {
  const schema = Joi.object({
    username: Joi.string().min(6).max(255).required(),
    roomId: Joi.string().min(24).max(24).required()
  })

  //validate the room
  const validation = schema.validate(req.body)

  // throw validation errors
  if (validation.error) {
    return res.status(400).json({ error: validation.error.details[0].message })
  }

  joinRoomService(req, res)
}

module.exports = {
  joinRoomValidation
}
