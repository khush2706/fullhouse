const mongoose = require("mongoose");

const User = new mongoose.Schema(
  {
    email: { type: String, required: true, min: 6, max: 255, unique: true },
    username: { type: String, required: true, min: 6, max: 255, unique: true },
    password: { type: String, required: true, min: 6, max: 255 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { collection: "user-data" }
);

const model = mongoose.model("UserData", User);

module.exports = model;
