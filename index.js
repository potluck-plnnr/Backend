const express = require("express")
const helmet = require("helmet")
const cors = require("cors")
const session = require("express-session")
const KnexSessionStore = require("connect-session-knex")(session)
const db = require("./data/config")
const usersRouter = require("./users/router.js")

const server = express()
const port = process.env.PORT || 5000

server.use(helmet())
server.use(cors())
server.use(express.json())
server.use(session({
	resave: false, // avoids recreating sessions that have not changed
	saveUninitialized: false, // comply with GDPR laws
	secret: "rawrrrr",
	store: new KnexSessionStore({
		knex: db, // configured instance of Knex, or the live database connection
		createtable: true, // if the session table does not exist, create it
	}),
}))

server.use(usersRouter)

server.get("/", (req, res, next) => {
    res.send("CONNECTED!")
}) 

server.use((err, req, res, next) => {
	console.log(err)
	
	res.status(500).json({
		message: "Something went wrong",
	})
})

server.listen(port, () => {
	console.log(`Running at http://localhost:${port}`)
})