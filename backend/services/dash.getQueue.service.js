const Queue = require("../models/queue.model");
var mongoose = require("mongoose");

const getQueueService = async (req, res) => {
  const { queueId } = req.params;
  var id = mongoose.Types.ObjectId(queueId);
  try {
    const queue = await Queue.findOne({ _id: id });
    res.status(200).json({
      status: "ok",
      data: {
        songs: queue.songs,
        currentTrackIndex: queue.currentTrackIndex,
        songStartTime: queue.songStartTime
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Something went wrong" });
  }
};

module.exports = {
  getQueueService,
};
