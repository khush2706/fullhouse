const mongoose = require("mongoose");
const {songSchema} = require("./song.model");
const {userSchema} = require("./user.model");

const queueSchema = new mongoose.Schema(
  {
    currentTrackIndex: { type: Number },
    songStartTime: { type: Date },
    songs: [songSchema],
    members: [userSchema]
  },
  { collection: "queue-data" }
);

const model = mongoose.model("queueModel", queueSchema);

module.exports = model;

