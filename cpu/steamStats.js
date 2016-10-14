// steamStats.js


exports.steamsStatsStart = function(hours) {
	getSteamStats(hours).then(function(data) {
		tempSteamStats(data, hours).then(function() {
			getServerStats(hours).then(function(statsArray) {
				serverStatsDiscord(statsArray, hours)
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

tempSteamStats = function(data, hours) {
	return new Promise(function(resolve, reject) {
		createTempStatsDB(hours).then(function() {
			for(let a in data) {
				for(let b in data[a].stats) {
					if(data[a].stats[b].value > 0) {
						knex('tempSteamStats' + hours).insert( {
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

exports.getUserStats = function(hours) {
	return new Promise(function(resolve, reject) {
			// console.log('deleted')
			let tempDB = 'tempSteamStats' + hours
			knex.select('vLastStats.steamid as steamid', 'vLastStats.name as steamname')
				.select(tempDB + '.name as stat')
				.sum(tempDB + '.value as value')
				.from('vLastStats')
				.groupBy(tempDB + '.name', 'vLastStats.steamid', 'vLastStats.name')
				// .orderByRaw('SUM(value) DESC')
				.orderBy('value', 'steamid')
				.join(tempDB, 'vLastStats.steamid', tempDB + '.steamid').as('tss')
				// .limit(10)
				.then(function(msg) {
					resolve(msg)			
				}).catch(function(err) {
					reject(err)
				})

	})
}


/*

SELECT 
vls."steamid" as "steamid",
vls."name" as "steamname",
SUM(CASE WHEN tss."name" = 'harvest.wood' THEN tss."value" ELSE 0 END) as "wood",
SUM(CASE WHEN tss."name" = 'harvest.stones' THEN tss."value" ELSE 0 END) as "stones",
SUM(CASE WHEN tss."name" = 'harvest.cloth' THEN tss."value" ELSE 0 END) as "cloth",
SUM(CASE WHEN tss."name" like 'harvest.%' THEN tss."value" ELSE 0 END) as "harvest_total",
SUM(CASE WHEN tss."name" = 'item_drop' THEN tss."value" ELSE 0 END) as "items_dropped",
SUM(CASE WHEN tss."name" = 'bullet_fired' THEN tss."value" ELSE 0 END) as "bullet_fired",
SUM(CASE WHEN tss."name" like 'bullet_hit_%' THEN tss."value" ELSE 0 END) as "bullet_hit",
SUM(CASE WHEN tss."name" = 'arrow_fired' THEN tss."value" ELSE 0 END) as "arrow_fired",
SUM(CASE WHEN tss."name" like 'arrow_hit_%' THEN tss."value" ELSE 0 END) as "arrow_hit",
SUM(CASE WHEN tss."name" like 'deaths' THEN tss."value" ELSE 0 END) as "deaths",
SUM(CASE WHEN tss."name" like 'wounded' THEN tss."value" ELSE 0 END) as "wounded"
FROM "vLastStats" vls
JOIN "tempSteamStats24" tss ON vls.steamid = tss.steamid
WHERE vls.NAME NOTNULL
GROUP BY 1,2
ORDER BY (6,3,2,1,8,9,10,11) DESC




SELECT 
vls."steamid" as "SteamID",
vls."name" as "Steam Name",
tss."name" as "Stat",
SUM(tss."value")

FROM "vLastStats" vls
JOIN "tempSteamStats24" tss ON vls.steamid = tss.steamid
WHERE vls.NAME NOTNULL
GROUP BY vls."steamid",
vls."name",
tss."name"
ORDER BY sum DESC

*/

serverStatsDiscord = function(statsArray, hours) {
	let cbRE = new RegExp("\\[\\d+:\\d+:\\d+\\] \\[Previous " + hours + " hours\\]```")
	discord.discordMessage.discordDeleteMessageType(discordRoom.general, cbRE).then(function (z) {
		var outmsg = '[Previous ' + hours + ' hours]' + '```'
		for(let a in statsArray) {
			outmsg = outmsg + ('\n' + statsArray[a].name + ' : ' + statsArray[a].sum)
		}
		outmsg = outmsg + '```'
		log(outmsg, 'd', null, discordRoom.general)
	})
}