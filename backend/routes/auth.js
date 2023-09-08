const router = require('express').Router()
const { registerValidation } = require('../controllers/auth.register.controller')
const { loginValidation } = require('../controllers/auth.login.controller')

router.post('/register', (req, res) => {
  registerValidation(req, res)
})

router.post('/login', (req, res) => {
  loginValidation(req, res)
})
module.exports = router
