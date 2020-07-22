const db = require("../data/config")

async function add(user) {
	const [id] = await db("users").insert(user)
	return findById(id)
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
		.select("p.name", "u.username as organizer", "p.date", "p.time", "p.items", "ud.guest_items as guest items")
}

function potlucks() {
	return db("potluck")
}

module.exports = {
	add,
	find,
	findBy,
	findById,
	potlucks,
	potluckByUser,
}