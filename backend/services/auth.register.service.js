const User = require("../models/user.model");

const registerService = async (username, password, res) => {
    try {
        const user = await User.create({
          username,
          password, // hashed password
        });
        res.status(201).json({ status: "ok", data: { userId: user._id } });
      } catch (err) {
        console.log(err);
        res.status(500).json({ err: "Duplicate username" });
      }
};

module.exports = {
    registerService,
  };