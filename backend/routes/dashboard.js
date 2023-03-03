const router = require("express").Router();
const {
  createRoomValidation,
} = require("../controllers/dash.createRoom.controller");
const {
  joinRoomValidation,
} = require("../controllers/dash.joinRoom.controller");

router.post("/create", (req, res) => {
  createRoomValidation(req, res);
});
module.exports = router;

router.patch("/join", (req, res) => {
  joinRoomValidation(req, res);
});
