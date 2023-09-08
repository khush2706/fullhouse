const mongoose = require('mongoose')
const { userSchema } = require('./user.model')

const roomSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, min: 6, max: 100 },
    description: { type: String, required: true, min: 6, max: 255 },
    isPublic: { type: Boolean, default: true, required: true },
    createdBy: { type: String, required: true },
    members: [userSchema],
    queue: { type: Object }
  },
  { collection: 'room-data', timestamps: true }
)

const model = mongoose.model('roomModel', roomSchema)

module.exports = model
