// sqlCreateTables.js

// exports.sqlCreateTablesGate = function() {
// 	for(let i in config.dbTables) {
// 		createTableFromConfig(i).then(function() {
// 			console.log('DB TABLE ' + i + ' EXISTS')
// 		})
// 	}
// }
const async = require('async')

exports.sqlCreateTablesGate = function() {
	for(let i in config.dbTables) {
		createTableFromConfig(i)
	}
}

createTableFromConfig = function(tableName) {
	switch(tableName) {
		case(config.dbTables.chat):
			createChatLogDB(tableName).then(function(){
				console.log('CHAT DB: ' + tableName + ' CHECK COMPLETE')
			})
			break;
		case(config.dbTables.connect):
			createConnectLogDB(tableName).then(function(){
				console.log('CONNECT DB: ' + tableName + ' CHECK COMPLETE')
			})
			break;
		case(config.dbTables.death):
			createDeathLogDB(tableName).then(function(){
				console.log('DEATH DB: ' + tableName + ' CHECK COMPLETE')
			})
			break;
		case(config.dbTables.connected):
			createDeathLogDB(tableName).then(function(){
				console.log('DEATH DB: ' + tableName + ' CHECK COMPLETE')
			})
			break;
	}
}




createConnectLogDB = function(tableName) {
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
						console.log('CONNECT DB: ' + tableName + ' CREATED')
						resolve()
					})
				} else {
					resolve()
				}
			})
	})
}

createConnectedLogDB = function(tableName) {
	return new Promise(function(resolve, reject) {
		knex.schema.hasTable(tableName)
		    .then(function(exists) {
		    	if(!exists) {
					knex.schema.createTable(tableName,function(table){
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
						console.log('CONNECT DB: ' + tableName + ' CREATED')
						resolve()
					})
				} else {
					resolve()
				}
			})
	})
}

createDeathLogDB = function(tableName) {
	return new Promise(function(resolve, reject) {
		knex.schema.hasTable(tableName)
		    .then(function(exists) {
		    	if(!exists) {
					knex.schema.createTable(tableName,function(table){
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
						console.log('DEATH DB: ' + tableName + ' CREATED')
						resolve()
					})
				} else {
					resolve()
				}
			})
	})
} 

createChatLogDB = function(tableName) {
	return new Promise(function(resolve, reject) {
		knex.schema.hasTable(tableName)
		    .then(function(exists) {
		    	if(!exists) {
					knex.schema.createTable(tableName,function(table){
						table.increments()
						table.timestamps(true, true)
						table.bigint('steamid')
						table.text('name')
						table.text('message')
						table.json('json')
					}).then(function (make) {
						console.log('CHAT DB: ' + tableName + ' CREATED')
						resolve()
					})
				} else {
					resolve()
				}
			})
	})
} 