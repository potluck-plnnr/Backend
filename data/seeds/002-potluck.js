
exports.seed = async function(knex) {
	await knex("potluck").insert([   
    //testpass123
		{ name: "potluck 1", date: "7/22/2020", time: "1:30PM", items: "dish1, dish2, dish3" },
		{ name: "potluck 2", date: "7/23/2020", time: "2:30PM", items: "dish1, dish2" },
	])
}