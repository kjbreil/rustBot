// sqlCreateTables.js

// exports.sqlCreateTablesGate = function() {
// 	for(let i in config.dbTables) {
// 		createTableFromConfig(i).then(function() {
// 			og('DB TABLE ' + i + ' EXISTS', 'lc', logFile.info, discordRoom.bot)
// 		}).catch(function(err) {log(err, 'lc', discordRoom.bot, logFile.info)})
// 	}
// }
const async = require('async')

exports.sqlCreateTablesGate = function() {
	// log(config.dbTables, 'lc', logFile.info, discordRoom.bot)
	for(let i in config.dbTables) {
		createTableFromConfig(config.dbTables[i])
	}
}

createTableFromConfig = function(tableName) {
	// log(tableName, 'lc', logFile.info, discordRoom.bot)
	switch(tableName) {
		case(config.dbTables.chat):
			createChatLogDB(tableName).then(function(){
				log('CHAT DB: ' + tableName + ' CHECK COMPLETE', 'lc', logFile.info, discordRoom.bot)
			}).catch(function(err) {log(err, 'lc', discordRoom.bot, logFile.info)})
			break;
		case(config.dbTables.connect):
			createConnectLogDB(tableName).then(function(){
				log('CONNECT DB: ' + tableName + ' CHECK COMPLETE', 'lc', logFile.info, discordRoom.bot)
			}).catch(function(err) {log(err, 'lc', discordRoom.bot, logFile.info)})
			break;
		case(config.dbTables.death):
			createDeathLogDB(tableName).then(function(){
				log('DEATH DB: ' + tableName + ' CHECK COMPLETE', 'lc', logFile.info, discordRoom.bot)
			}).catch(function(err) {log(err, 'lc', discordRoom.bot, logFile.info)})
			break;
		case(config.dbTables.log):
			createRawLogDB(tableName).then(function(){
				log('LOG DB: ' + tableName + ' CHECK COMPLETE', 'lc', logFile.info, discordRoom.bot)
			}).catch(function(err) {log(err, 'lc', discordRoom.bot, logFile.info)})
			break;
		case(config.dbTables.playerlist):
			createPlayerListDB(tableName).then(function(){
				log('PLAYERLIST DB: ' + tableName + ' CHECK COMPLETE', 'lc', logFile.info, discordRoom.bot)
			}).catch(function(err) {log(err, 'lc', discordRoom.bot, logFile.info)})
			break;
		case(config.dbTables.steamstats_audit):
			createSteamStatsAuditDB(tableName).then(function(){
				log('steamstats_audit DB: ' + tableName + ' CHECK COMPLETE', 'lc', logFile.info, discordRoom.bot)
			}).catch(function(err) {log(err, 'lc', discordRoom.bot, logFile.info)})
			break;
		case(config.dbTables.steamstats_server):
			createSteamStatsServerDB(tableName).then(function(){
				log('steamstats_server DB: ' + tableName + ' CHECK COMPLETE', 'lc', logFile.info, discordRoom.bot)
			}).catch(function(err) {log(err, 'lc', discordRoom.bot, logFile.info)})
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
						table.jsonb('stats')
					}).then(function (make) {
						log('STEAM_AUDIT DB: ' + tableName + ' CREATED', 'lc', logFile.info, discordRoom.bot)
						resolve()
					})
				} else {
					resolve()
				}
			}).catch(function(err) {
				reject(err)
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
						config.dbTables.death('stats')
					}).then(function (make) {
						log('STEAM_SERVER DB: ' + tableName + ' CREATED', 'lc', logFile.info, discordRoom.bot)
						resolve()
					})
				} else {
					resolve()
				}
			}).catch(function(err) {
				reject(err)
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
						log('PLAYERLIST DB: ' + tableName + ' CREATED', 'lc', logFile.info, discordRoom.bot)
						resolve()
					})
				} else {
					resolve()
				}
			}).catch(function(err) {
				reject(err)
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
						log('CONNECT DB: ' + tableName + ' CREATED', 'lc', logFile.info, discordRoom.bot)
						resolve()
					})
				} else {
					resolve()
				}
			}).catch(function(err) {
				reject(err)
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
						table.jsonb('log')
					}).then(function (make) {
						log('CONNECT DB: ' + tableName + ' CREATED', 'lc', logFile.info, discordRoom.bot)
						resolve()
					})
				} else {
					resolve()
				}
			}).catch(function(err) {
				reject(err)
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
						log('CONNECT DB: ' + tableName + ' CREATED', 'lc', logFile.info, discordRoom.bot)
						resolve()
					})
				} else {
					resolve()
				}
			}).catch(function(err) {
				reject(err)
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
						log('DEATH DB: ' + tableName + ' CREATED', 'lc', logFile.info, discordRoom.bot)
						resolve()
					})
				} else {
					resolve()
				}
			}).catch(function(err) {
				reject(err)
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
						table.jsonb('json')
					}).then(function (make) {
						log('CHAT DB: ' + tableName + ' CREATED', 'lc', logFile.info, discordRoom.bot)
						resolve()
					})
				} else {
					resolve()
				}
			}).catch(function(err) {
				reject(err)
			})
	})
} 