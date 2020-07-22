const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Users = require("./model")
const restrict = require("../middleware/restrict")

const router = express.Router()

router.get("/users", restrict(), async (req, res, next) => {
	try {
		res.json(await Users.find())
	} catch(err) {
		next(err)
	}
})

router.post("/register", async (req, res, next) => {
	try {
		const { username, password } = req.body
		const user = await Users.findBy({ username }).first()

		if (user) {
			return res.status(409).json({
				message: "Username is already taken",
			})
		}

		const newUser = await Users.add({
			username,
			// hash the password with a time complexity of "14"
			password: await bcrypt.hash(password, 14),
		})

		res.status(201).json(newUser)
	} catch(err) {
		next(err)
	}
})

router.post("/login", async (req, res, next) => {
	try {
		const { username, password } = req.body
		const user = await Users.findBy({ username }).first()
		
		if (!user) {
			return res.status(401).json({
				message: "Invalid Credentials",
			})
		}

		// hash the password again and see if it matches what we have in the database
		const passwordValid = await bcrypt.compare(password, user.password)

		if (!passwordValid) {
			return res.status(401).json({
				message: "Invalid Credentials",
			})
		}

		// generate a new session for this user,
		// and sends back a session ID
		// req.session.user = user

		const payload = {
			userId: user.id,
			username: user.username,
			//department: user.department, // would normally come from database
		}

		//res.cookie("token", jwt.sign(payload, process.env.JWT_SECRET || "some ssecret")) // sets cookie DONT USE IN BUILD WEEK
		res.json({
			token: jwt.sign(payload, process.env.JWT_SECRET || "some ssecret"), // for build week do tokens
			message: `Welcome ${user.username}!`,
		})
	} catch(err) {
		next(err)
	}
})

router.get('/logout', (req, res) => {
    if(req.header.token){
        req.header.token.destroy(err => {
            if(err){
                res.status(500).json({ message: "Failed to logout"})
            } else {
                res.status(200).json({ message: "You have successfully logged out"})
            }
        })
    } else {
        res.status(200).json({ message: "You have successfully logged out"})
    }
})

router.get("/potluck/:id", async (req, res, next) => {
	try {
		const user = await Users.potluckByUser(req.params.id)
		if (!user) {
			return res.status(404).json({
				message: "user not found",
			})
		}
		res.json(user)
	} catch(err) {
		next(err)
	}
})

router.get("/potlucks", async (req, res, next) => {
    try {
        const potlucks = await Users.potlucks()
        res.json(potlucks)
    } catch(err) {
        next(err)
    }
})

module.exports = router




// const express = require("express")
// const bcrypt = require("bcryptjs")
// const Users = require("./model")
// const restrict = require("../middleware/restrict")

// const router = express.Router()

// router.get("/users", restrict(), async (req, res, next) => {
// 	try {
// 		res.json(await Users.find())
// 	} catch(err) {
// 		next(err)
// 	}
// })

// router.post("/register", async (req, res, next) => {
// 	try {
// 		const { username, password } = req.body
// 		const user = await Users.findBy({ username }).first()

// 		if (user) {
// 			return res.status(409).json({
// 				message: "Username is already taken",
// 			})
// 		}

// 		const newUser = await Users.add({
// 			username,
// 			// hash the password with a time complexity of "14"
// 			password: await bcrypt.hash(password, 14),
// 		})

// 		res.status(201).json(newUser)
// 	} catch(err) {
// 		next(err)
// 	}
// })

// router.post("/login", async (req, res, next) => {
// 	try {
// 		const { username, password } = req.body
// 		const user = await Users.findBy({ username }).first()
		
// 		if (!user) {
// 			return res.status(401).json({
// 				message: "Invalid Credentials",
// 			})
// 		}

// 		// hash the password again and see if it matches what we have in the database
// 		const passwordValid = await bcrypt.compare(password, user.password)

// 		if (!passwordValid) {
// 			return res.status(401).json({
// 				message: "Invalid Credentials",
// 			})
// 		}

// 		// generate a new session for this user,
// 		// and sends back a session ID
// 		req.session.user = user

// 		res.json({
// 			message: `Welcome ${user.username}!`,
// 		})
// 	} catch(err) {
// 		next(err)
// 	}
// })

// router.get("/logout", async (req, res, next) => {
// 	try {
// 		req.session.destroy((err) => {
// 			if (err) {
// 				next(err)
// 			} else {
// 				res.status(204).end()
// 			}
// 		})
// 	} catch (err) {
// 		next(err)
// 	}
// })

// module.exports = router