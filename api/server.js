const express = require('express')
// const actionRouter = require('./routes/actionsRouter')
// const projectRouter = require('./routes/projectsRouter')
const server = express()
//const cors = require("cors")

//server.use(cors)
server.use(express.json())


// server.use('/api/actions', actionRouter)
// server.use('/api/projects', projectRouter)


server.get('/', (req, res) => {
    res.send('Sever is running')
})


module.exports = server;