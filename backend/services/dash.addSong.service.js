const Queue = require("../models/queue.model");
const { model: User } = require("../models/user.model");

var mongoose = require("mongoose");

const addSongService = async (req, res) => {
  const { username, queueId, songTitle, channelName, thumbnailUrl, videoId } = req.body;
  let id = mongoose.Types.ObjectId(queueId);
  // const user = await User.findOne({ username: username });
  try {
    const queue = await Queue.findOne({ _id: id });
    if (queue.length === 0) throw new Error("Queue not found");
		const newSong = await 
    await Queue.findOneAndUpdate({ _id: id }, { $push: { members: username } });
    res.status(200).json({
      status: "ok",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: err.message });
  }
};

module.exports = {
  addSongService,
};
