const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Users = require("./model")
const restrict = require("../middleware/restrict")

const router = express.Router()


// USERS 

router.get("/users", restrict(), async (req, res, next) => {
	try {
		res.json(await Users.find())
	} catch(err) {
		next(err)
	}
})

router.post("/register", async (req, res, next) => {
	try {
		const { username, password, role } = req.body
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
			role,
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

router.get("/logout", (req, res) => {
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

// POTLUCKS

router.get("/potluck/:id", validatePotluckId, async (req, res, next) => {
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

router.post("/potluck", validateData, (req, res) => {
    const potluckid = req.params.id
    const potluckinfo = {...req.body, id: potluckid }

    Users.addPotluck(potluckinfo)
        .then(potluck => {
            res.status(201).json(potluck);
        })
        .catch(err => {
            console.log("Error:", err);
            res.status(500).json({ error: "There was an error creating a potluck." })
        })
});

router.put("/potluck/:id", validateData, (req, res) => {
    
    const id = req.params.id
    Users.updatePotluck(id, req.body)
        .then(potluck => {
            res.status(200).json({ message: "SUCCESSS!!", potluck })
        })
        .catch(err => {
            console.log("Error: ", err)
            res.status(500).json({ message: "there was a problem updating potluck." })
        })
});

router.delete("/potluck/:id", validatePotluckId, (req, res, next) => {
	Users.deletePotluck(req.params.id)
		.then(() => {
			res.status(200).json({
				message: "The potluck has been nuked"
			})
		})
		.catch(next)
});

// GUESTS

router.get("/guests", async (req, res, next) => {
    try {
        const guests = await Users.getGuests()
        res.json(guests)
    } catch(err) {
        next(err)
    }
})

router.post("/addGuest/:pid", validateGuestData,  (req, res) => {
	const pid = req.params.pid
    const guestInfo = { ...req.body, potluck_id: pid }

    Users.addGuest(guestInfo)
        .then(guest => {
            res.status(201).json(guest);
        })
        .catch(err => {
            console.log("Error:", err);
            res.status(500).json({ error: "There was an error adding a guest." })
        })
});

// custom middleware

function validatePotluckId(req, res, next) {
    
    Users.findPotluckById(req.params.id)
        .then(potluck => {
            if (potluck) {
                req.potluck = potluck
                next();
            } else {
                res.status(400).json({ message: "Invalid potluck id" });
            }
        })
        .catch(err => {
            console.log("error:", err);
            res.status(500).json({ message: `there was a problem with your ${req.method} request` })
        })
}

function validateData(req, res, next) {
    
    if (req.body) {
        if (req.body.name) {
			next();
		} else if (req.body.date) {
			next();
		} else if (req.body.time) {
			next();
		} else if (req.body.items) {
			next();
        } else {
            res.status(400).json({ message: "a required field is missing." })
        }
    } else {
        res.status(400).json({ message: "Missing post data." });
    }
}

function validateGuestData(req, res, next) {
    
    if (req.body) {
        if (req.body.user_id) {
			next();
		} else if (req.body.role) {
			next();
		} else if (req.body.guest_items) {
			next();
        } else {
            res.status(400).json({ message: "a required field is missing." })
        }
    } else {
        res.status(400).json({ message: "Missing post data." });
    }
}

module.exports = router

