const router = require("express").Router();
const {
  createRoomValidation,
} = require("../controllers/dash.createRoom.controller");
const {
  joinRoomValidation,
} = require("../controllers/dash.joinRoom.controller");
const { getRoomService } = require("../services/dash.getRoom.service");
const {
  getRoomsService,
} = require("../services/dash.getRooms.service")

router.post("/create", (req, res) => {
  createRoomValidation(req, res);
});
module.exports = router;

router.patch("/join", (req, res) => {
  joinRoomValidation(req, res);
});

router.get("/", (req,res) => {
  getRoomsService(req, res);
})

router.get("/:roomId", (req,res) => {
  getRoomService(req, res);
})

// router.patch("/leave", (req, res) => {

// })