const User = require("../models/user.model");

const registerService = async (username, password, res) => {

  // throw error when username already registered
  const isUsernameExist = await User.findOne({ username: username });

  if (isUsernameExist) {
    return res.status(400).json({ error: "Username already exists " });
  }
  
  try {
    const user = await User.create({
      username,
      password, // hashed password
    });
    res.status(201).json({ status: "ok", data: { userId: user._id } });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Error! Cannot register user" });
  }
};

module.exports = {
  registerService,
};
