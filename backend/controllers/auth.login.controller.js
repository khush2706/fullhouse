const Joi = require('@hapi/joi')
const { loginService } = require('../services/auth.login.service')

const loginValidation = async (req, res) => {
  const schema = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(255).required()
  })

  //validate the user
  const validation = schema.validate(req.body)

  // throw validation errors
  if (validation.error) {
    return res.status(400).json({ error: validation.error.details[0].message })
  }

  loginService(req.body.email, req.body.password, res)
}

module.exports = {
  loginValidation
}
