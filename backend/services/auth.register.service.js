const User = require("../models/user.model");

const registerService = async (email, username, password, res) => {
  // throw error when username already registered
  const isEmailExist = await User.findOne({ email: email });

  if (isEmailExist) {
    return res.status(400).json({ error: "Email already exists " });
  }

  try {
    const user = await User.create({
      email,
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
