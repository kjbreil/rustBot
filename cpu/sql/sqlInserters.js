// sqlInserters.js
// cpu.sql.sqlInserters.sqlInsertersGate(line, type)
exports.sqlInsertersGate = function(line, type) {
	// console.log(line)
	switch(type) {
		case('death'):
			deathToSql(line).then(function() {
				log('DEATH INSERTED: ' + line, 'l', logFile.sql, null)
			}).catch(function(err) {

			})
			break;
		case('connect'):
			connectLogToSQL(line).then(function() {
				log('CONNECT INSERTED: ' + line, 'l', logFile.sql, null)
			}).catch(function(err) {

			})
			break;
		case('chat'):
			chatLogToSQL(line).then(function() {
				log('CHAT INSERTED: ' + line, 'l', logFile.sql, null)
			}).catch(function(err) {

			})
		case('log'):
			logAllRcon(line).then(function() {
				log('LOG INSERTED: ' + line, 'l', logFile.sql, null)
			}).catch(function(err) {

			})
		default:
			log(type + ' is not a defined type for ' + line, 'l', logFile.sql, null)
	}
}

logAllRcon = function(line) {
	return new Promise(function(resolve, reject) {
		knex(config.dbTables.log).insert( {
			log: line
		}).then(function() {
		console.log('log inserted')
		}).catch(function(err) {
			console.log('log insert failed' + err)
		})		
	})
}
exports.playerListToSQL = function(playerList) {

	console.log(playerList)
	for(let i in playerList) {
		console.log(playerList[i].Address)
		let ip = playerList[i].Address.substr(0, playerList[i].Address.indexOf(":"))
		let port = playerList[i].Address.substr(playerList[i].Address.indexOf(":") + 1)
		console.log(ip)
		console.log(port)
		knex(config.dbTables.playerlist).insert( {
			steamid: playerList[i].SteamID,
			ownersteamid: playerList[i].OwnerSteamID,
			name: playerList[i].DisplayName,
			ping: playerList[i].Ping,
			ip: ip,
			port: port,
			connectedseconds: playerList[i].ConnectedSeconds,
			violationlevel: playerList[i].VoiationLevel,
			unspentxp: playerList[i].UnspentXp,
			health: playerList[i].Health
		}).then(function() {
			console.log('playerlist inserted')
		})
	}
}

exports.pvpNonSleeper = function(line) {
	let pvpRE = RegExp(/(.+?)\[(\d+)\/(\d+)\] \w+ (killed) \w+? (.+?)\[(\d+)\/(\d+?)\]$/)
	pvp = pvpRE.exec(line)
	// console.log(pvp[3])
	knex(config.dbTables.death).insert( {
		victim_steamid: pvp[3],
		victim_name: pvp[1],
		killer_steamid: pvp[7],
		killer_name: pvp[5],
		pvp: true,
		sleeper: false,
		line: line
	}).then(function() {
	console.log('pvp inserted')
	}).catch(function(err) {
		console.log('pvp insert failed' + err)
	})
}

exports.pvpSleeper = function(line) {
	let pvpRE = RegExp(/(.+?)\[(\d+)\/(\d+)\] \w+ (killed) \w+? (.+?)\[(\d+)\/(\d+?)\]$/)
	pvp = pvpRE.exec(line)
	// console.log('no pa found')
	knex(config.dbTables.death).insert( {
		victim_steamid: pvp[3],
		victim_name: pvp[1],
		killer_steamid: pvp[7],
		killer_name: pvp[5],
		pvp: true,
		sleeper: true,
		line: line
	}).then(function() {
		console.log('sleeper inserted')
	}).catch(function(err) {
		console.log('sleeper insert failed' + err)
	})
}


deathToSql = function(line) {
	let pvpRE = RegExp(/(.+?)\[(\d+)\/(\d+)\] \w+ (killed) \w+? (.+?)\[(\d+)\/(\d+?)\]$/)
	let killedRE = RegExp(/(.+?)\[(\d+)\/(\d+)\] was (killed) by (\w+)/)
	let suicideRE = RegExp(/(.+?)\[(\d+)\/(\d+)\] was (\w+) by (\w+)/)
	let diedRE = RegExp(/(.+?)\[(\d+)\/(\d+)\] (died) \((.+)\)$/)
	return new Promise(function(resolve, reject) {

		if(pvp = pvpRE.exec(line)) {
			// line = RegExp(/(^.+)\[(\d+)\/(\d+)\] was killed by (.+)\[(\d+)\/(\d+)\]$/).exec(line)
			// console.log('STEAMID: ' + pvp[3])
		 //    rust.rconListPlayers.getPlayerIsOnline(pvp[3]).then(function (pa) {
		 //    	console.log('after get player')
		 //    	console.log(pa === undefined)
		 //    	if(pa) { console.log('pa found')
			// 		knex(config.dbTables.death).insert( {
			// 			victim_steamid: pvp[3],
			// 			victim_name: pvp[1],
			// 			killer_steamid: pvp[7],
			// 			killer_name: pvp[5],
			// 			pvp: true,
			// 			sleeper: false,
			// 			line: line
			// 		}).then(function() {
			// 			console.log('sleeper inserted')
			// 			reject()
			// 		}).catch(function(err) {
			// 			console.log('sleeper insert failed')
			// 		})
		 //    	} else { console.log('no pa found')
			// 		knex(config.dbTables.death).insert( {
			// 			victim_steamid: pvp[3],
			// 			victim_name: pvp[1],
			// 			killer_steamid: pvp[7],
			// 			killer_name: pvp[5],
			// 			pvp: true,
			// 			sleeper: true,
			// 			line: line
			// 		}).then(function() {
			// 			console.log('pvp inserted')
			// 			reject()
			// 		}).catch(function(err) {
			// 			console.log('pvp insert failed')
			// 		})
		 //    	}
		 //    }).catch(function(err) {
			// 	console.log('online check')
			// })
			resolve()

		} else if (killed = killedRE.exec(line)) {
			knex(config.dbTables.death).insert( {
					victim_steamid: killed[3],
					victim_name: killed[1],
					killer_name: killed[5],
					killed: true,
					line: line
				}).then(function() {
					console.log('killed inserted')
					reject()
				}).catch(function(err) {
					console.log('killed insert failed')
				})
		} else if (suicide = suicideRE.exec(line)) {
			knex(config.dbTables.death).insert( {
					victim_steamid: suicide[3],
					victim_name: suicide[1],
					killer_name: suicide[5],
					suicide: true,
					line: line
				}).then(function() {
					console.log('suicide inserted')
					reject()
				}).catch(function(err) {
					console.log('suicide insert failed')
				})
		} else if (died = diedRE.exec(line)) {
			knex(config.dbTables.death).insert( {
					victim_steamid: died[3],
					victim_name: died[1],
					killer_name: died[5],
					died: true,
					line: line
				}).then(function() {
					console.log('died inserted')
					reject()
				}).catch(function(err) {
					console.log('died insert failed')
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
			knex(config.dbTables.connect).insert( {
				ip: dis[1],
				port: dis[2],
				line: line,
				steamid: dis[3],
				name: dis[4],
				disconnect: true,
				disconnect_why: dis[6]
			}).then(function() {
				console.log('disconnect inserted')
				reject()
			})
				// console.log(dis)
		} else if (join = joinedRE.exec(line)) {
			knex(config.dbTables.connect).insert( {
				ip: join[1],
				port: join[2],
				line: line,
				steamid: join[3],
				name: join[4],
				connect: true,
				os: join[5],
				os_steamid: join[6]
			}).then(function() {
				console.log('joined inserted')
				reject()
			})
		} else if (auth = authRE.exec(line)) {
			knex(config.dbTables.connect).insert( {
				ip: auth[1],
				port: auth[2],
				line: line,
				steamid: auth[3],
				name: auth[4],
				auth: true,
				auth_level: auth[5]
			}).then(function() {
				console.log('auth inserted')
				reject()
			})
		} else {
			resolve(line)
		}
	})
}
chatLogToSQL = function(line) {
	// console.log('CHAT: ' + line)
	// let chatRE = RegExp(/^\[CHAT\] (.+)\[(\d+)\/(\d+)\] : (.+)$/)
	return new Promise(function(resolve, reject) {
		// chat = chatRE.exec(line.message)
		msg = JSON.parse(line)
		knex(config.dbTables.chat).insert( {
					steamid: msg.UserId,
					name: msg.Username,
					message: msg.Message,
					json: msg
				}).then(function() {
					console.log('chat inserted')
					reject()
				})
		})
}