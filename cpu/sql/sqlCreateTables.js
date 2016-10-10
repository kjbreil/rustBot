// sqlCreateTables.js

exports.sqlCreateTablesGate = function() {
	createConnectLogDB().then(function () {
		createDeathLogDB().then(function() {
			console.log('DB TABLE CHECK COMPLETE')
		})
	})
}

createConnectLogDB = function() {
	return new Promise(function(resolve, reject) {
		knex.schema.hasTable('connect_log')
		    .then(function(exists) {
		    	if(!exists) {
					knex.schema.createTable('connect_log',function(table){
						table.increments()
						table.timestamps(true, true)
						table.specificType('ip', 'inet')
						table.integer('port')
						table.bigint('steamid')
						table.text('name')
						table.boolean('connect').nullable()
						table.text('os').nullable()
						table.bigint('os_steamid').nullable()
						table.boolean('disconnect').nullable()
						table.text('disconnect_why').nullable()
						table.boolean('auth').nullable()
						table.text('auth_level').nullable()
						table.text('line')
					}).then(function (make) {
						console.log('Connect Table Made')
						resolve()
					})
				} else {
					resolve()
				}
			})
	})
}

createDeathLogDB = function() {
	return new Promise(function(resolve, reject) {
		knex.schema.hasTable('death_log')
		    .then(function(exists) {
		    	if(!exists) {
					knex.schema.createTable('death_log',function(table){
						table.increments()
						table.timestamps(true, true)
						table.bigint('victim_steamid')
						table.text('victim_name')
						table.bigint('killer_steamid').nullable()
						table.text('killer_name').nullable()
						table.boolean('sleeper').nullable()
						table.boolean('pvp').nullable()
						table.boolean('died').nullable()
						table.boolean('killed').nullable()
						table.boolean('suicide').nullable()
						table.text('line')
					}).then(function (make) {
						console.log('Death Table Made')
						resolve()
					})
				} else {
					resolve()
				}
			})
	})
}