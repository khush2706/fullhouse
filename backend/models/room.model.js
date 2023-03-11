const mongoose = require("mongoose");
const {userSchema} = require("./user.model");
const Queue = require("./queue.model")

const roomSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, min: 6, max: 100 },
    description: { type: String, required: true, min: 6, max: 255 },
    isPublic: { type: Boolean, default: true, required: true },
    createdBy: { type: String, required: true },
    members: [userSchema],
    queue: { type: mongoose.Schema.Types.ObjectId, ref: Queue }
  },
  { collection: "room-data", timestamps: true }
);

const model = mongoose.model("roomModel", roomSchema);

module.exports = model;
