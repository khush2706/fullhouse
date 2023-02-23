const Joi = require("@hapi/joi");
const bcrypt = require("bcryptjs");
const { registerService } = require('../services/auth.register.service')

const registerValidation = async (req, res) => {
  const schema = Joi.object({
    username: Joi.string().min(6).max(255).required(),
    password: Joi.string().min(6).max(1024).required(),
  });

  //validate the user
  const validation = schema.validate(req.body);

  if (validation.error) {
    return res.status(400).json({ error: validation.error.details[0].message });
  }

  //hash the password
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, salt);

  registerService(req.body.username, password, res);
};

    
module.exports = {
  registerValidation,
};
