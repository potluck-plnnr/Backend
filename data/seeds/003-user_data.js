exports.seed = async function(knex) {
	await knex("user_data").insert([   
    //testpass123
		{ potluck_id: 1, user_id: 1, role: "organizer", guest_items: null },
    { potluck_id: 2, user_id: 2, role: "organizer", guest_items: null },
    { potluck_id: 1, user_id: 3, role: "guest", guest_items: "dish1" },
    { potluck_id: 2, user_id: 4, role: "guest", guest_items: "dish2" },
	])
}
