const mongoose = require("mongoose");
const { userSchema } = require("./user.model");

const songSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    artist: { type: String, required: true },
    addedBy: { type: userSchema, required: true },
  },
  { timestamps: true }
);


module.exports = { songSchema };
