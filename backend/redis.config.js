require('dotenv').config()
const redis = require('redis')

const client = redis.createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOSTNAME,
    port: process.env.REDIS_PORT
  }
})

;(async () => {
  client.on('error', (error) => console.error(`Error : ${error}`))

  await client.connect()
})()

module.exports = { redisClient: client }
