// sqlCreateTables.js


exports.sqlCreateTablesGate = function() {
	for(let i in config.dbTables) {
		createTableFromConfig(i).then(function() {
			console.log('DB TABLE ' + i + ' EXISTS')
		})
	}
}

createTableFromConfig = function(tableName) {
	return new Promise(function(resolve, reject) {
		knex.schema.hasTable(tableName)
		    .then(function(exists) {
		    	if(!exists) {
					knex.schema.createTable(tableName,function(table){
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
						console.log('DB TABLE ' + tableName + ' CREATED')
						resolve()
					})
				} else {
					resolve()
				}
			})
	})
}