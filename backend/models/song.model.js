const mongoose = require("mongoose");
const { userSchema } = require("./user.model");

const songSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    artist: { type: String, required: true },
    addedBy: { type: String, required: true },
    videoId: { type: String, required: true },
    thumbnail: { type: String, required: true }
  },
  { timestamps: true }
);


module.exports = { songSchema };
