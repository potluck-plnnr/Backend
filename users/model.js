const db = require("../data/config")

// USERS
async function add(user) {
	const [id] = await db("users").insert(user, 'id')
	return findById(id)
}

function deleteUser(id) {
	return db("users")
		.where({ id })
		.del()
}

function find() {
	return db("users").select("id", "username")
}

function findBy(filter) {
	return db("users")
		.select("id", "username", "password")
		.where(filter)
}

function findById(id) {
	return db("users")
		.select("id", "username")
		.where({ id })
		.first()
}

function potluckByUser(id) {
	return db("users as u")		
		.where("u.id", id)
		//.andWhere("ud.role", "organizer")
		.join("user_data as ud", "ud.user_id", "u.id")
		.join("potluck as p", "p.id", "ud.potluck_id")
		.select("p.name", "u.username as User", "ud.role as role", "p.date", "p.time", "p.items as itemsToBring", "ud.guest_items as guestItems")
}

// SELECT *
// FROM users as u
// JOIN user_data as ud ON
// 	ud.user_id = u.id
// JOIN potluck as p 
// WHERE p.id = ud.potluck_id
// AND ud.role = "guest"

// POTLUCKS

function findPotluckById(id) {
	return db("potluck")
		.where({ id })
		.first()
}

function potlucks() {
	return db("potluck")
}

async function addPotluck(potluck) {
	await db("potluck")
		.insert(potluck, 'id')
		.then(ids => {
			return findPotluckById(ids[0])
		})
}

function updatePotluck(id, changes) {
	return db("potluck")
		.where({ id })
		.update(changes)
}

function deletePotluck(id) {
	return db("potluck")
		.where({ id })
		.del()
}

// GUESTS

function findGuestById(id) {
	return db("user_data as ud")
		.where("ud.role", "guest")
		.andWhere({ id })
		.first()
}

function getGuests() {
	return db("user_data as ud")
		.where("ud.role", "guest")
}

async function addGuest(guestInfo) {
	await db("user_data")
		.insert(guestInfo, 'id')
		.then(ids => {
			return findPotluckById(ids[0])
		})
}

module.exports = {
	add,
	deleteUser,
	find,
	findBy,
	findById,
	potlucks,
	potluckByUser,
	addPotluck,
	findPotluckById,
	updatePotluck,
	deletePotluck,
	getGuests,
	addGuest,
	findGuestById,
}