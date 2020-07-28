exports.up = async function(knex) {
	await knex.schema.createTable("users", (table) => {
		table.increments()
		table.text("username").notNull().unique()
        table.text("password").notNull()
	})
	await knex.schema.createTable("potluck", (table) => {
		table.increments()
		table.text("name").notNull()
		table.date("date").notNull()
		table.time("time").notNull()
		table.text("items").notNull()
	})
	await knex.schema.createTable("user_data", (table) => {
		table.increments()
		table
			.integer("potluck_id")
			.references("id")
			.inTable("potluck")
			.notNull()
			.onDelete("cascade")
			.onUpdate("cascade")
		table
			.integer("user_id")
			.references("id")
			.inTable("users")
			.notNull()
			.onDelete("cascade")
			.onUpdate("cascade")
		table.text("role").notNull()
		table.text("guest_items")
	})
}

exports.down = async function(knex) {
	await knex.schema.dropTableIfExists("user_data")
	await knex.schema.dropTableIfExists("potluck")
	await knex.schema.dropTableIfExists("users")
}