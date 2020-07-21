// function restrict() {
// 	const authError = {
// 		message: "Invalid credentials",
// 	}
	
// 	return async (req, res, next) => {
// 		try {
// 			if (!req.session || !req.session.user) {
// 				return res.status(401).json(authError)
// 			}

// 			// if we reach this point, the user is considered authorized!
// 			next()
// 		} catch (err) {
// 			next(err)
// 		}
// 	}
// }

// module.exports = restrict

const jwt = require("jsonwebtoken")

// const roles = [
//     "suspended",
// 	"sales",
// 	"management",
// ]

function restrict(role) {
	return async (req, res, next) => {
		const authError = {
			message: "Invalid credentials",
		}
		// const authError2 = {
		// 	message: "Invalid credentials 2",
		// }
		const authError3 = {
			message: "Invalid credentials 3",
		}

		try {
			//const token = req.cookies.token // read cookie
			const token = req.headers.token // for build week

			if (!token) {
				return res.status(401).json(authError3)
			}

			jwt.verify(token, "some ssecret", (err, decoded) => { // jwt.verify - the variable with token, secret, err
				if (err) {
					return res.status(401).json(authError)
				}

				// if (role && roles.indexOf(decoded.department) < roles.indexOf(role)) {
				// 	return res.status(401).json(authError2)
				// }

				next()
			})	
			
			
		} catch(err) {
			next(err)
		}
	}
}

module.exports = restrict