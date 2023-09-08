const Joi = require('@hapi/joi')
const { createRoomService } = require('../services/dash.createRoom.service')

const createRoomValidation = async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(6).max(100).required(),
    description: Joi.string().min(6).max(255).required(),
    isPublic: Joi.bool(),
    username: Joi.string().min(6).max(255).required()
  })

  //validate the room
  const validation = schema.validate(req.body)

  // throw validation errors
  if (validation.error) {
    return res.status(400).json({ error: validation.error.details[0].message })
  }

  createRoomService(req, res)
}

module.exports = {
  createRoomValidation
}
