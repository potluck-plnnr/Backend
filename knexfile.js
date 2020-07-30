module.exports = {
	client: "pg",
	//useNullAsDefault: true,
	connection: 'postgres:gxipmrmu:Th4hDyJ5mcltcRW-jyGOd-EZ4i0YoK01@ruby.db.elephantsql.com:5432/gxipmrmu',
    migrations: {
        directory: './data/migrations'
    },
    seeds: {
        directory: './data/seeds'
    },
    // pool: {
    //     afterCreate: (conn, done) => {
    //         conn.run("PRAGMA foreign_keys = ON", done)
    //     },
    // },
}