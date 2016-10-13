// sqlInserters.js
// cpu.sql.sqlInserters.sqlInsertersGate(line, type)

var SteamApi = require('steam-api')
var userStats = new SteamApi.UserStats(config.steamApiKey)

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
	for(let i in playerList) {
		let ip = playerList[i].Address.substr(0, playerList[i].Address.indexOf(":"))
		let port = playerList[i].Address.substr(playerList[i].Address.indexOf(":") + 1)
		knex(config.dbTables.playerlist).insert( {
			steamid: playerList[i].SteamID,
			ownersteamid: playerList[i].OwnerSteamID,
			name: playerList[i].DisplayName,
			ping: playerList[i].Ping,
			ip: ip,
			port: port,
			connectedseconds: playerList[i].ConnectedSeconds,
			currentlevel: playerList[i].CurrentLevel,
			violationlevel: playerList[i].VoiationLevel,
			unspentxp: playerList[i].UnspentXp,
			health: playerList[i].Health
		}).then(function() {
			console.log('player inserted')
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
			insertUserStats(dis[3], false)
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
			insertUserStats(join[3], true)
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


insertUserStats = function(steamid, connect) {
	userStats.GetUserStatsForGame('252490', steamid).then(function(msg) {
		let sql = []
		sql.push({name: 'steamid', value: '76561198014626147'})
		for(let i in msg.stats) {
			sql.push(msg.stats[i])
		}
		console.log(!connect)
		if(!connect) {
			insertUserServerStats(steamid)
			console.log('in if')
		}
		// console.log(sql[0].value)
		knex(config.dbTables.steamstats_audit).insert( {
			onconnect: connect,
			steamid: sql[0].value,
			deaths: sql[1].value,
			bulletfired: sql[2].value,
			arrowfired: sql[3].value,
			itemdrop: sql[4].value,
			blueprintstudied:sql[5].value,
			deathsuicide: sql[6].value,
			deathfall: sql[7].value,
			deathselfinflicted: sql[8].value,
			killplayer: sql[9].value,
			bullethitplayer: sql[10].value,
			arrowhitentity: sql[11].value,
			harvestfatanimal: sql[12].value,
			harveststones: sql[13].value,
			bullethitentity: sql[14].value,
			harvestcloth: sql[15].value,
			harvestwood: sql[16].value,
			arrowhitbuilding: sql[17].value,
			killbear: sql[18].value,
			killboar: sql[19].value,
			killstag: sql[20].value,
			killchicken: sql[21].value,
			killhorse: sql[22].value,
			killwolf: sql[23].value,
			harvestmetalore: sql[24].value,
			headshot: sql[25].value,
			harvestsulfurore: sql[26].value,
			harvestbonefragments: sql[27].value,
			harvesthumanmeatraw: sql[28].value,
			arrowhitboar: sql[29].value,
			arrowhitbear: sql[30].value,
			arrowhitwolf: sql[31].value,
			arrowhitstag: sql[32].value,
			arrowhitchicke: sql[33].value,
			bullethitbuilding: sql[33].value,
			harvestwolfmeatraw: sql[34].value,
			harvestskullhuma: sql[35].value,
			harvestskullwolf: sql[36].value,
			arrowhithorse: sql[37].value,
			arrowhitplayer: sql[38].value,
			deathentity: sql[39].value,
			deathwolf: sql[40].value,
			deathbear: sql[41].value,
			shotgunfired: sql[42].value,
			shotgunhitbuildin: sql[43].value,
			bullethitbear: sql[44].value,
			bullethithorse: sql[45].value,
			bullethitstag: sql[46].value,
			bullethitwolf: sql[47].value,
			bullethitboar: sql[48].value,
			bullethitsign: sql[49].value,
			wounded: sql[50].value,
			woundedassiste: sql[51].value,
			woundedheale: sql[52].value,
			bullethitplayercorpse: sql[53].value,
			bullethitcorpse: sql[54].value
		}).then(function() {
				console.log('holy shit it was inserted')
		}).catch(function(err) {
			console.log(err)
		})
	}).catch(function(err) {
		console.log(err)
	})
}

insertUserServerStats = function(steamid) {
	userStats.GetUserStatsForGame('252490', steamid).then(function(msg) {
		let sql = []
		sql.push({name: 'steamid', value: '76561198014626147'})
		for(let i in msg.stats) {
			sql.push(msg.stats[i])
		}
		console.log('in user server')
		sqlSelectSteamStatsLastConnect(steamid).then(function(sqlstats) {
			knex(config.dbTables.steamstats_server).insert( {
				steamid: (sqlstats[0].steamid),
				deaths: (sql[1].value - sqlstats[0].deaths),
				bulletfired: (sql[2].value - sqlstats[0].bulletfired),
				arrowfired: (sql[3].value - sqlstats[0].arrowfired),
				itemdrop: (sql[4].value - sqlstats[0].itemdrop),
				blueprintstudied:(sql[5].value - sqlstats[0].blueprintstudied),
				deathsuicide: (sql[6].value - sqlstats[0].deathsuicide),
				deathfall: (sql[7].value - sqlstats[0].deathfall),
				deathselfinflicted: (sql[8].value - sqlstats[0].deathselfinflicted),
				killplayer: (sql[9].value - sqlstats[0].killplayer),
				bullethitplayer: (sql[10].value - sqlstats[0].bullethitplayer),
				arrowhitentity: (sql[11].value - sqlstats[0].arrowhitentity),
				harvestfatanimal: (sql[12].value - sqlstats[0].harvestfatanimal),
				harveststones: (sql[13].value - sqlstats[0].harveststones),
				bullethitentity: (sql[14].value - sqlstats[0].bullethitentity),
				harvestcloth: (sql[15].value - sqlstats[0].harvestcloth),
				harvestwood: (sql[16].value - sqlstats[0].harvestwood),
				arrowhitbuilding: (sql[17].value - sqlstats[0].arrowhitbuilding),
				killbear: (sql[18].value - sqlstats[0].killbear),
				killboar: (sql[19].value - sqlstats[0].killboar),
				killstag: (sql[20].value - sqlstats[0].killstag),
				killchicken: (sql[21].value - sqlstats[0].killchicken),
				killhorse: (sql[22].value - sqlstats[0].killhorse),
				killwolf: (sql[23].value - sqlstats[0].killwolf),
				harvestmetalore: (sql[24].value - sqlstats[0].harvestmetalore),
				headshot: (sql[25].value - sqlstats[0].headshot),
				harvestsulfurore: (sql[26].value - sqlstats[0].harvestsulfurore),
				harvestbonefragments: (sql[27].value - sqlstats[0].harvestbonefragments),
				harvesthumanmeatraw: (sql[28].value - sqlstats[0].harvesthumanmeatraw),
				arrowhitboar: (sql[29].value - sqlstats[0].arrowhitboar),
				arrowhitbear: (sql[30].value - sqlstats[0].arrowhitbear),
				arrowhitwolf: (sql[31].value - sqlstats[0].arrowhitwolf),
				arrowhitstag: (sql[32].value - sqlstats[0].arrowhitstag),
				arrowhitchicke: (sql[33].value - sqlstats[0].arrowhitchicke),
				bullethitbuilding: (sql[33].value - sqlstats[0].bullethitbuilding),
				harvestwolfmeatraw: (sql[34].value - sqlstats[0].harvestwolfmeatraw),
				harvestskullhuma: (sql[35].value - sqlstats[0].harvestskullhuma),
				harvestskullwolf: (sql[36].value - sqlstats[0].harvestskullwolf),
				arrowhithorse: (sql[37].value - sqlstats[0].arrowhithorse),
				arrowhitplayer: (sql[38].value - sqlstats[0].arrowhitplayer),
				deathentity: (sql[39].value - sqlstats[0].deathentity),
				deathwolf: (sql[40].value - sqlstats[0].deathwolf),
				deathbear: (sql[41].value - sqlstats[0].deathbear),
				shotgunfired: (sql[42].value - sqlstats[0].shotgunfired),
				shotgunhitbuildin: (sql[43].value - sqlstats[0].shotgunhitbuildin),
				bullethitbear: (sql[44].value - sqlstats[0].bullethitbear),
				bullethithorse: (sql[45].value - sqlstats[0].bullethithorse),
				bullethitstag: (sql[46].value - sqlstats[0].bullethitstag),
				bullethitwolf: (sql[47].value - sqlstats[0].bullethitwolf),
				bullethitboar: (sql[48].value - sqlstats[0].bullethitboar),
				bullethitsign: (sql[49].value - sqlstats[0].bullethitsign),
				wounded: (sql[50].value - sqlstats[0].wounded),
				woundedassiste: (sql[51].value - sqlstats[0].woundedassiste),
				woundedheale: (sql[52].value - sqlstats[0].woundedheale),
				bullethitplayercorpse: (sql[53].value - sqlstats[0].bullethitplayercorpse),
				bullethitcorpse: (sql[54].value - sqlstats[0].bullethitcorpse)
			}).then(function() {
					console.log('holy shit it was inserted again')
			}).catch(function(err) {
				console.log(err)
			})
		}).catch(function(err) {
		console.log(err)
	}).catch(function(err) {
		console.log(err)
	})
})
}



sqlSelectSteamStatsLastConnect = function(steamid) {
	return new Promise(function(resolve, reject) {
		// console.log('inside')
		knex.select('*').from('steamstats_audit').where( {steamid: steamid} ).limit(1).orderBy('created_at', 'desc').then(function(msg) {
			// console.log(msg)
			resolve(msg)
		}).catch(function(err) {
		console.log(err)
		})
	})
}


