const express = require('express')
const server = express()
const cors = require("cors")
const bodyParser = require('body-parser')

server.use(cors)
server.use(express.json())
server.use(bodyParser.json())


server.get('/', (req, res) => {
    res.send('Sever is running')
})


module.exports = server;