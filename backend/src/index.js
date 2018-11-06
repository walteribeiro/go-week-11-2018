const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

const server = require('http').Server(app)
const io = require('socket.io')(server)

const MONGO_URL =
  'mongodb://goweek:goweek123@ds251217.mlab.com:51217/goweek_11-2018'
mongoose.connect(
  MONGO_URL,
  { useNewUrlParser: true }
)

app.use((req, res, next) => {
  req.io = io
  return next()
})
app.use(cors())
app.use(express.json())
app.use(require('./routes'))

server.listen(3000, () => {
  console.log('Server started on port 3000')
})
