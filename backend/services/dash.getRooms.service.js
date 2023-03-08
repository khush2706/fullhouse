const Room = require("../models/room.model");

const getRoomsService = async (req, res) => {
  function selectFewerProps(room){
    const {_id, name, description, createdBy, members} = room;
    const creator = createdBy.username;
    const noOfMembers = members.length;
    return {_id, name, description, creator, noOfMembers};
  }
  try {
    const rooms = await Room.find({ isPublic: true });
    const roomsData = rooms.map(selectFewerProps);
    res.status(200).json({
      status: "ok",
      data: {
        roomsData,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: err });
  }
};

module.exports = {
    getRoomsService,
  };
