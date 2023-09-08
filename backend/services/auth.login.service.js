const { model: User } = require('../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const loginService = async (email, password, res) => {
  const user = await User.findOne({ email: email })

  // throw error when email is wrong
  if (!user) return res.status(400).json({ err: 'Email not found' })

  // check for password correctness
  const validPassword = await bcrypt.compare(password, user.password)

  if (!validPassword) return res.status(400).json({ err: 'Password is wrong' })

  // create token
  const token = jwt.sign(
    // payload data
    {
      name: user.username,
      id: user._id
    },
    process.env.TOKEN_SECRET
  )
  res.header('auth-token', token).json({
    error: null,
    data: {
      token,
      username: user.username
    }
  })
}

module.exports = {
  loginService
}
