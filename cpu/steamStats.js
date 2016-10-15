// steamStats.js


exports.steamServerStats = function(hours) {
	getSteamStats(hours).then(function(data) {
		tempSteamStats(data, hours).then(function() {
			getServerStats(hours).then(function(statsArray) {
				serverStatsDiscord(statsArray, hours)
			})
		})
	})
}

exports.steamUserStats = function(hours) {
	getUserStats(hours).then(function(a) {
		userStatsCreateJson(a).then(function(b) {
			userStatsDiscord(b, hours)
			// console.log(b)
		})
	})
}


getSteamStats = function(hours) {
	return new Promise(function(resolve, reject) {
		knex.select('*').from('steamstats_server')
			.whereRaw('steamstats_server.created_at > (now() - \'' + hours + ' hour\'::interval)')
			.then(function(msg) {
				resolve(msg)			
			}).catch(function(err) {
				console.log(err)
				reject()
			})
	})
}

tempSteamStats = function(data, hours) {
	return new Promise(function(resolve, reject) {
		createTempStatsDB(hours).then(function() {
			for(let a in data) {
				for(let b in data[a].stats) {
					if(data[a].stats[b].value > 0) {
						knex('tempSteamStats' + hours).insert( {
							data_time: data[a].created_at,
							steamid: data[a].steamid,
							name: data[a].stats[b].name,
							value: data[a].stats[b].value	
						}).then(function() {
							// console.log('INSERT')
						}).catch(function(err) {
							console.log('LOG INSERT FAILED' + err)
						})	
					}
				}
			}
			resolve()
		})
	})
}
	


createTempStatsDB = function(hours) {
	return new Promise(function(resolve, reject) {
		knex.schema.dropTableIfExists('tempSteamStats' + hours).then(function() {
			// console.log('DROPPED')
			knex.schema.createTable('tempSteamStats' + hours, function(table) {
				table.increments()
				table.timestamp('created_at').defaultTo(knex.fn.now())
				table.timestamp('data_time')
				table.bigint('steamid')
				table.text('name')
				table.bigint('value')
			}).then(function (make) {
				console.log('STEAM_AUDIT DB: tempSteamStats' + hours + ' CREATED')
				resolve()
			}).catch(function(err) {
				console.log(err)
			})
		})
	})
}

getServerStats = function(hours) {
	return new Promise(function(resolve, reject) {
			// console.log('deleted')
			knex.select('name')
				.sum('value')
				.from('tempSteamStats' + hours)
				.groupBy('name')
				.orderByRaw('SUM(value) DESC')
				.then(function(msg) {
					resolve(msg)			
				}).catch(function(err) {
					reject(err)
				})

	})
}

getUserStats = function(hours) {
	return new Promise(function(resolve, reject) {
		// console.log('deleted')
		let tempDB = 'tempSteamStats' + hours
		knex.select('vLastStats.steamid as steamid', 'vLastStats.name as steamname')
			.select(tempDB + '.name as stat')
			.sum(tempDB + '.value as value')
			.from('vLastStats')
			.groupBy(tempDB + '.name', 'vLastStats.steamid', 'vLastStats.name')
			// .orderByRaw('SUM(value) DESC')
			.whereNotNull(tempDB + '.name')
			.orderBy('value', 'desc')
			.join(tempDB, 'vLastStats.steamid', tempDB + '.steamid').as('tss')
			// .limit(10)
			.then(function(msg) {
				resolve(msg)			
			}).catch(function(err) {
				reject(err)
			})

	})
}



serverStatsDiscord = function(statsArray, hours) {
	let cbRE = new RegExp("\\[\\d+:\\d+:\\d+\\] \\[SERVER\\]\\[" + hours + " hours\\]```")
	discord.discordMessage.discordDeleteMessageType(discordRoom.general, cbRE).then(function (z) {
		var outmsg = '[SERVER][' + hours + ' hours]' + '```'
		for(let a in statsArray) {
			outmsg = outmsg + ('\n' + statsArray[a].name + ' : ' + statsArray[a].sum)
		}
		outmsg = outmsg + '```'
		log(outmsg, 'd', null, discordRoom.general)
	})
}

sumArrayValues = function(array) {
	let sum = 0
	for(let a in array) {
		sum += parseInt(array[a])
	}
	return sum
}

userStatsDiscord = function(statsArray, hours) {
	let cbRE = new RegExp("\\[\\d+:\\d+:\\d+\\] \\[USER\\]\\[" + hours + " hours\\]\\[\\d+\\]```")
	discord.discordMessage.discordDeleteMessageType(discordRoom.general, cbRE).then(function (z) {
		// console.log(z)
		var msgNum = 1
		let ttlMsg = 1
		var outmsg = '[USER][' + hours + ' hours][0]' + '```'
		for(let a in statsArray) {
			let steamname = '[###]' + statsArray[a].name + ']'
			outmsg += '\n' + steamname
			msgNum += 1

			let blank = discord.discordMessage.fixedWidth(1, '', ' ')
			// let dash10 = discord.discordMessage.fixedWidth(10, '', '-')
			let subLine = discord.discordMessage.fixedWidth(1, '', '|')
			let mainLine = discord.discordMessage.fixedWidth(3, '|=>', '-')

			let valueFill = '-'
			
			let harvestTotal = discord.discordMessage.fixedWidth(6, sumArrayValues(statsArray[a].harvest), valueFill)
			if(sumArrayValues(statsArray[a].harvest) > 0) {
				outmsg += ('\n' + mainLine + 'harvest: ' + harvestTotal)
				msgNum += 1
			}
			for(let b in statsArray[a].harvest) {
				let insideStat = discord.discordMessage.fixedWidth(6, statsArray[a].harvest[b], valueFill)
				outmsg += (subLine + b + ': '+ insideStat)
				// msgNum += 1
			}

			let bulletTotal = discord.discordMessage.fixedWidth(4, sumArrayValues(statsArray[a].bullet), valueFill)
			if(sumArrayValues(statsArray[a].bullet) > 0) {
				outmsg += ('\n' + mainLine + 'bullets: ' + bulletTotal)
					msgNum += 1
			}
			for(let b in statsArray[a].bullet_hit) {
				let insideStat = discord.discordMessage.fixedWidth(3, statsArray[a].bullet_hit[b], valueFill)
				let insideName = discord.discordMessage.fixedWidth(6, b)
				outmsg += (subLine + insideName + ': '+ insideStat)
				// msgNum += 1
			}

			let arrowTotal = discord.discordMessage.fixedWidth(4, sumArrayValues(statsArray[a].arrow), valueFill)
			if(sumArrayValues(statsArray[a].arrow) > 0) {
				outmsg += ('\n' + mainLine + 'arrows : ' + arrowTotal)
				msgNum += 1
			}
			for(let b in statsArray[a].arrow_hit) {
				let insideStat = discord.discordMessage.fixedWidth(3, statsArray[a].arrow_hit[b], valueFill)
				let insideName = discord.discordMessage.fixedWidth(6, b)
				outmsg += (subLine + insideName + ': '+ insideStat)
				// msgNum += 1
			}

			let shotgunTotal = discord.discordMessage.fixedWidth(4, sumArrayValues(statsArray[a].shotgun), valueFill)
			if(sumArrayValues(statsArray[a].shotgun) > 0) {
				outmsg += ('\n' + mainLine + 'shotgun: ' + shotgunTotal)
				msgNum += 1
			}
			for(let b in statsArray[a].shotgun_hit) {
				let insideStat = discord.discordMessage.fixedWidth(3, statsArray[a].shotgun_hit[b], valueFill)
				let insideName = discord.discordMessage.fixedWidth(6, b)
				outmsg += (subLine + insideName + ': '+ insideStat)
				// msgNum += 1
			}
			if (msgNum > 15) {
				ttlMsg += msgNum
				outmsg += '```'
				// console.log(outmsg)
				log(outmsg, 'dl', logFile.discord, discordRoom.general)
				outmsg = '[USER][' + hours + ' hours][' + ttlMsg + ']' + '```'
				msgNum = 1
			}
			
		}
		outmsg += '```'
		// console.log(outmsg)
		log(outmsg, 'dl', logFile.discord, discordRoom.general)
		// process.exit()
	})
}


/*

  '76561198030172959': 
   { name: 'hellsboy',
     kill: [ '{boar: 1}', '{bear: 1}', '{player: 2}' ],
     headshot: '1',
     death: [ '{selfinflicted: 2}', '{suicide: 7}', '{entity: 31}' ],
     wounded: [ '{assisted: 2}' ],
     bullet_hit: 
      [ '{boar: 2}',
        '{bear: 7}',
        '{player: 10}',
        '{building: 50}',
        '{entity: 115}' ],
     harvest: [ '{harvest.cloth: 10}', '{harvest.wood: 9304}' ],
     deaths: '42',
     item: [ '{drop: 92}' ],
     bullet: [ '{fired: 283}' ] },

*/

userStatsCreateJson = function(s) {
	return new Promise(function(resolve, reject) {
		let statsJson = {} 
		for(i in s) {
			let steamid = [s[i].steamid]
			let sname = [s[i].stat]
			let svalue = s[i].value
			// let [s[i].stat] = s[i].value
			

			if(!statsJson[steamid[0]]) {
				statsJson[steamid[0]] = {}
			}
			statsJson[steamid[0]].name = s[i].steamname
			if(ta = RegExp(/(^harvest)\.?(.+)?/).exec(sname[0])) {
				if(!statsJson[steamid[0]].harvest) {
					statsJson[steamid[0]].harvest = {}
				}
				let aname = [ta[2]]
				statsJson[steamid[0]].harvest[aname[0]] = svalue
			} else if (under = RegExp(/(^.+)\_(.+)/).exec(sname[0])) {
				if(!statsJson[steamid[0]][under[1]]) {
					statsJson[steamid[0]][under[1]] = {}
				}
				let aname = [under[2]]
				statsJson[steamid[0]][under[1]][aname[0]] = svalue
			} else {
				statsJson[steamid[0]][sname[0]] = svalue
			}
			
		}
		resolve(statsJson)
	})
}