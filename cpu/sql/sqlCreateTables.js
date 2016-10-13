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
	// console.log(config.dbTables)
	for(let i in config.dbTables) {
		createTableFromConfig(config.dbTables[i])
	}
}

createTableFromConfig = function(tableName) {
	// console.log(tableName)
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
		case(config.dbTables.log):
			createRawLogDB(tableName).then(function(){
				console.log('LOG DB: ' + tableName + ' CHECK COMPLETE')
			})
			break;
		case(config.dbTables.playerlist):
			createPlayerListDB(tableName).then(function(){
				console.log('PLAYERLIST DB: ' + tableName + ' CHECK COMPLETE')
			})
			break;
		case(config.dbTables.steamstats_audit):
			createSteamStatsAuditDB(tableName).then(function(){
				console.log('steamstats_audit DB: ' + tableName + ' CHECK COMPLETE')
			})
			break;
		case(config.dbTables.steamstats_server):
			createSteamStatsServerDB(tableName).then(function(){
				console.log('steamstats_server DB: ' + tableName + ' CHECK COMPLETE')
			})
			break;
	}
}

createSteamStatsAuditDB = function(tableName) {
	return new Promise(function(resolve, reject) {
		knex.schema.hasTable(tableName)
		    .then(function(exists) {
		    	if(!exists) {
					knex.schema.createTable(tableName,function(table){
						table.increments()
						table.timestamps(true, true)
						table.boolean('connect')
						table.bigint('steamid')
						table.json('stats')
					}).then(function (make) {
						console.log('STEAM_AUDIT DB: ' + tableName + ' CREATED')
						resolve()
					})
				} else {
					resolve()
				}
			})
	})
}

createSteamStatsServerDB = function(tableName) {
	return new Promise(function(resolve, reject) {
		knex.schema.hasTable(tableName)
		    .then(function(exists) {
		    	if(!exists) {
					knex.schema.createTable(tableName,function(table){
						table.increments()
						table.timestamps(true, true)
						table.timestamp('connect_time')
						table.bigint('steamid')
						table.json('stats')
					}).then(function (make) {
						console.log('STEAM_SERVER DB: ' + tableName + ' CREATED')
						resolve()
					})
				} else {
					resolve()
				}
			})
	})
}

createPlayerListDB = function(tableName) {
	return new Promise(function(resolve, reject) {
		knex.schema.hasTable(tableName)
		    .then(function(exists) {
		    	if(!exists) {
					knex.schema.createTable(tableName,function(table){
						table.increments()
						table.timestamps(true, true)
						table.boolean('onconnect')
						table.bigint('steamid')
						table.bigint('ownersteamid')
						table.text('name')
						table.integer('ping')
						table.specificType('ip', 'inet')
						table.integer('port')
						table.integer('connectedseconds')
						table.decimal('violationlevel')
						table.decimal('currentlevel')
						table.decimal('unspentxp')
						table.decimal('health')
					}).then(function (make) {
						console.log('PLAYERLIST DB: ' + tableName + ' CREATED')
						resolve()
					})
				} else {
					resolve()
				}
			})
	})
}

/*
  {
    "SteamID": "76561198291012548",
    "OwnerSteamID": "0",
    "DisplayName": "evanburris",
    "Ping": 100,
    "Address": "75.190.46.148:62676",
    "ConnectedSeconds": 3858,
    "VoiationLevel": 0.0,
    "CurrentLevel": 20.0,
    "UnspentXp": 128.0,
    "Health": 100.0
  }
*/

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

createRawLogDB = function(tableName) {
	return new Promise(function(resolve, reject) {
		knex.schema.hasTable(tableName)
		    .then(function(exists) {
		    	if(!exists) {
					knex.schema.createTable(tableName,function(table){
						table.increments()
						table.timestamp('created_at', true)
						table.json('log')
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