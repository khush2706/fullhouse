const {removeTopSongService} = require('../services/dash.removeTopSong.service')

const Joi = require('@hapi/joi')

const removeTopSongValidation = async (req, res) => {
    const schema = Joi.object({
      queueId: Joi.string().min(42).max(42).required()
    })
  
    //validate the room
    const validation = schema.validate(req.body)
  
    // throw validation errors
    if (validation.error) {
      return res.status(400).json({ error: validation.error.details[0].message })
    }
  
    removeTopSongService(req, res)
  }
  
  module.exports = {
    removeTopSongValidation
  }