const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
  const token = req.header('auth-token')
  if (!token) return res.status(401).json({ error: 'Access denied' })
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET)
    req.user = verified
    next() // to continue the flow
  } catch (err) {
    res.status(400).json({ error: 'Token is not valid' })
  }
}
module.exports = verifyToken
