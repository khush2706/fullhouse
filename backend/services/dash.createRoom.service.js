const Room = require("../models/room.model");
const { model: User } = require("../models/user.model");
const Queue = require("../models/queue.model");

const createRoomService = async (req, res) => {
  const { username, name, isPublic, description } = req.body;
  const user = await User.findOne({ username: username });
  try {
    const newQueue = await Queue.create({});
    const queueId = newQueue._id;
    const newRoom = await Room.create({
      name: name,
      description: description,
      isPublic: isPublic,
      createdBy: username,
      members: [user],
      queue: queueId,
    });
    res.status(201).json({
      status: "ok",
      data: {
        roomId: newRoom._id,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Error! Cannot create room" });
  }
};

module.exports = {
  createRoomService,
};
