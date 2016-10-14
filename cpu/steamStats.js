// steamStats.js

exports.steamsStatsStart = function(hours) {
	getSteamStats(hours).then(function(data) {
		tempSteamStats(data).then(function() {
			outputServerStats().then(function(statsArray) {
				let cbRE = new RegExp(/\[\d+:\d+:\d+\] \[Previous \d+ hours\]```/)
				discord.discordMessage.discordDeleteMessageType(discordRoom.general, cbRE).then(function (z) {
					var outmsg = '[Previous ' + hours + ' hours]' + '```'
					for(let a in statsArray) {
						outmsg = outmsg + ('\n' + statsArray[a].name + ' : ' + statsArray[a].sum)
					}
					outmsg = outmsg + '```'
					log(outmsg, 'd', null, discordRoom.general)
				})
			})
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

tempSteamStats = function(data) {
	return new Promise(function(resolve, reject) {
		createTempStatsDB().then(function() {
			for(let a in data) {
				for(let b in data[a].stats) {
					if(data[a].stats[b].value > 0) {
						knex('tempSteamStats').insert( {
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
	


createTempStatsDB = function() {
	return new Promise(function(resolve, reject) {
		knex.schema.dropTableIfExists('tempSteamStats').then(function() {
			// console.log('DROPPED')
			knex.schema.createTable('tempSteamStats', function(table) {
				table.increments()
				table.timestamp('created_at').defaultTo(knex.fn.now())
				table.bigint('steamid')
				table.text('name')
				table.bigint('value')
			}).then(function (make) {
				console.log('STEAM_AUDIT DB: tempSteamStats CREATED')
				resolve()
			}).catch(function(err) {
				console.log(err)
			})
		})
	})
}

outputServerStats = function() {
	return new Promise(function(resolve, reject) {
			// console.log('deleted')
			knex.select('name')
				.sum('value')
				.from('tempSteamStats')
				.groupBy('name')
				.orderByRaw('SUM(value) DESC')
				.then(function(msg) {
					resolve(msg)			
				}).catch(function(err) {
					reject(err)
				})

	})
}
