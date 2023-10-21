const router = require('express').Router()
const { createRoomValidation } = require('../controllers/dash.createRoom.controller')
const { joinRoomValidation } = require('../controllers/dash.joinRoom.controller')
const { getRoomService } = require('../services/dash.getRoom.service')
const { getRoomsService } = require('../services/dash.getRooms.service')
const { joinQueueValidation } = require('../controllers/dash.joinQueue.controller')
const { getQueueService } = require('../services/dash.getQueue.service')
const { addSongValidation } = require('../controllers/dash.addSong.controller')
const { removeTopSongValidation } = require('../controllers/dash.removeTopSong.controller')
const { leaveRoomValidation } = require('../controllers/dash.leaveRoom.controller')

router.post('/create', (req, res) => {
  createRoomValidation(req, res)
})
module.exports = router

router.patch('/join', (req, res) => {
  joinRoomValidation(req, res)
})

router.patch('/leave', (req, res) => {
  leaveRoomValidation(req, res)
})

router.get('/', (req, res) => {
  getRoomsService(req, res)
})

router.get('/room/:roomId', (req, res) => {
  getRoomService(req, res)
})

// router.patch("/leave", (req, res) => {

// })

router.post('/joinQueue', (req, res) => {
  joinQueueValidation(req, res)
})

router.get('/queue/:queueId', (req, res) => {
  getQueueService(req, res)
})

router.patch('/addSong', (req, res) => {
  addSongValidation(req, res)
})

router.patch('/removeTopSong', (req, res) => {
  removeTopSongValidation(req, res)
})
