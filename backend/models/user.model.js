const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, min: 6, max: 255, unique: true },
    username: { type: String, required: true, min: 6, max: 255, unique: true },
    password: { type: String, required: true, min: 6, max: 255 }
  },
  { collection: 'user-data', timestamps: true }
)

const model = mongoose.model('userModel', userSchema)

module.exports = { userSchema, model }
