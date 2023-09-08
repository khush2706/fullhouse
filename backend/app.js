const { redisClient } = require('./redis.config')
const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const verifyToken = require('./middleware/validateToken')
const dashboardRoutes = require('./routes/dashboard')
const { Server } = require('socket.io')
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE']
  }
})

redisClient.on('connect', () => {
  ;(async () => {
    console.log('Connected to our redis instance!')
  })()
})
const { socketHandler } = require('./sockets/socket')

dotenv.config()

app.use(cors())
app.use(express.json())

socketHandler(io)

// connect to db
mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Mongo Connection Successful!')
  })
  .catch((err) => console.error(err))

//import routes
const authRoutes = require('./routes/auth')

// route middlewares
app.use('/api/user', authRoutes)

// this route is protected with token
app.use('/api/dashboard', verifyToken, dashboardRoutes)

server.listen(1337, () => {
  console.log('listening on port 1337')
})

// module.export = io;
