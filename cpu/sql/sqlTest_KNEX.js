// sqlTest.js



global.config = require('./../../config.js')


let knexClient = config.knex.client
let knexConnection = config.knex.connection

log(config.knex, 'lc', logFile.info, discordRoom.bot)


global.knex = require('knex')(config.knex)

// datetime, ip, port, steamid, name, connect, os, os_steamid, disconnect, disconnect_why, auth, auth_level

// knex.select('datetime', 'ip', 'port').from('connect_log').then(function (msg) {
// 	log(msg, 'lc', logFile.info, discordRoom.bot)
// })

var lineReader = require('line-reader');




// var bookshelf = require('bookshelf')(knex);

// var connect_log = bookshelf.Model.extend({
// 	tableName: 'connect_log',
// })
// datetime, ip, port, steamid, name, connect, os, os_steamid, disconnect, disconnect_why, auth, auth_level



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
						log('Connect Table Made', 'lc', logFile.info, discordRoom.bot)
						createDeathLogDB()
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
						log('Death Table Made', 'lc', logFile.info, discordRoom.bot)
						startLineReader()
						resolve()
					})
				} else {
					resolve()
				}
			})
	})
}

var schemaCreation =function() {
		createConnectLogDB().then(function () {
			createDeathLogDB().then(function() {
				startLineReader()
			})
		})
}





deathToSql = function(line) {
	let pvpRE = RegExp(/(.+?)\[(\d+)\/(\d+)\] \w+ (killed) \w+? (.+?)\[\d+\/(\d+?)\]$/)
	let killedRE = RegExp(/(.+?)\[(\d+)\/(\d+)\] was (killed) by (\w+)/)
	let suicideRE = RegExp(/(.+?)\[(\d+)\/(\d+)\] was (\w+) by (\w+)/)
	let diedRE = RegExp(/(.+?)\[(\d+)\/(\d+)\] (died) \((.+)\)$/)
	return new Promise(function(resolve, reject) {

		if(pvp = pvpRE.exec(line)) {
			knex('death_log').insert( {
					victim_steamid: pvp[3],
					victim_name: pvp[1],
					killer_steamid: pvp[6],
					killer_name: pvp[5],
					pvp: true,
					line: line
				}).then(function() {
					log('pvp inserted', 'lc', logFile.info, discordRoom.bot)
					reject()
				})
		} else if (killed = killedRE.exec(line)) {
			knex('death_log').insert( {
					victim_steamid: killed[3],
					victim_name: killed[1],
					killer_name: killed[5],
					killed: true,
					line: line
				}).then(function() {
					log('killed inserted', 'lc', logFile.info, discordRoom.bot)
					reject()
				})
		} else if (suicide = suicideRE.exec(line)) {
			knex('death_log').insert( {
					victim_steamid: suicide[3],
					victim_name: suicide[1],
					killer_name: suicide[5],
					died: true,
					line: line
				}).then(function() {
					log('suicide inserted', 'lc', logFile.info, discordRoom.bot)
					reject()
				})
		} else if (suicide = diedRE.exec(line)) {
			knex('death_log').insert( {
					victim_steamid: suicide[3],
					victim_name: suicide[1],
					killer_name: suicide[5],
					suicide: true,
					line: line
				}).then(function() {
					log('died inserted', 'lc', logFile.info, discordRoom.bot)
					reject()
				})
		} else {
			resolve(line)
		}
	})
}

connectLogToSQL = function(line) {
	let disconnectRE = RegExp(/^(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})\:(\d{1,6})\/(\d+?)\/(.+) (disconnecting): (.+)/)
	let joinedRE = RegExp(/^(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})\:(\d{1,6})\/(\d+?)\/(.+) joined \[(.+)\/(\d+)\]$/)
	let authRE = RegExp(/^(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})\:(\d{1,6})\/(\d+?)\/(.+) has auth level (\d)/)
	return new Promise(function(resolve, reject) {
		if(dis = disconnectRE.exec(line)) {
			knex('connect_log').insert( {
				ip: dis[1],
				port: dis[2],
				line: line,
				steamid: dis[3],
				name: dis[4],
				disconnect: true,
				disconnect_why: dis[6]
			}).then(function() {
				log('disconnect inserted', 'lc', logFile.info, discordRoom.bot)
				reject()
			})
				// log(dis, 'lc', logFile.info, discordRoom.bot)
		} else if (join = joinedRE.exec(line)) {
			knex('connect_log').insert( {
				ip: join[1],
				port: join[2],
				line: line,
				steamid: join[3],
				name: join[4],
				connect: true,
				os: join[5],
				os_steamid: join[6]
			}).then(function() {
				log('joined inserted', 'lc', logFile.info, discordRoom.bot)
				reject()
			})
		} else if (auth = authRE.exec(line)) {
			knex('connect_log').insert( {
				ip: auth[1],
				port: auth[2],
				line: line,
				steamid: auth[3],
				name: auth[4],
				auth: true,
				auth_level: auth[5]
			}).then(function() {
				log('auth inserted', 'lc', logFile.info, discordRoom.bot)
				reject()
			})
		} else {
			resolve(line)
		}
	})
}

startLineReader = function() {
	lineReader.eachLine('merged.log', function(line, last) {
		deathToSql(line).then(function(line) {
			connectLogToSQL(line).then(function(line) {
				if(line === '') {

				} else if (line === '\n') {
					
				} else {
					// log(line, 'lc', logFile.info, discordRoom.bot)
				}
				
			}).catch(function(err) {

			})
		}).catch(function (err) {
            // log('skipped', 'lc', logFile.info, discordRoom.bot)
        })
		
	})
}



schemaCreation()