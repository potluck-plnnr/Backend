exports.seed = async function(knex) {
	await knex("users").insert([   
    //testpass123
		{ username: "joejoe", password: "$2a$14$MgT5eroslPd4OWhuQhd.I.M.HKebjGsYaYSIObUwMyXeUhhDhkKLS" },
    { username: "jackjack", password: "$2a$14$MgT5eroslPd4OWhuQhd.I.M.HKebjGsYaYSIObUwMyXeUhhDhkKLS" },
    { username: "guestjoe", password: "$2a$14$MgT5eroslPd4OWhuQhd.I.M.HKebjGsYaYSIObUwMyXeUhhDhkKLS" },
    { username: "guestjack", password: "$2a$14$MgT5eroslPd4OWhuQhd.I.M.HKebjGsYaYSIObUwMyXeUhhDhkKLS" },
	])
}
