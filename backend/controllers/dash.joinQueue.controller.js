const Joi = require('@hapi/joi')
const { joinQueueService } = require('../services/dash.joinQueue.service')

const joinQueueValidation = async (req, res) => {
  const schema = Joi.object({
    username: Joi.string().min(6).max(255).required(),
    queueId: Joi.string().min(42).max(42).required()
  })

  //validate the room
  const validation = schema.validate(req.body)

  // throw validation errors
  if (validation.error) {
    return res.status(400).json({ error: validation.error.details[0].message })
  }

  joinQueueService(req, res)
}

module.exports = {
  joinQueueValidation
}
