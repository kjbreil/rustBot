// steamStats.js

exports.steamServerStats = function (hours) {
  getSteamStats(hours).then(function (data) {
    tempSteamStats(data, hours).then(function () {
      getServerStats(hours).then(function (statsArray) {
        serverStatsCreateJson(statsArray).then(function (b) {
          statsDiscord(b, hours, 'SERVER')
        }).catch(function (err) { log(err, 'lc', logFile.info, discordRoom.bot) })
      }).catch(function (err) { log(err, 'lc', logFile.info, discordRoom.bot) })
    }).catch(function (err) { log(err, 'lc', logFile.info, discordRoom.bot) })
  }).catch(function (err) { log(err, 'lc', logFile.info, discordRoom.bot) })
}

exports.steamUserStats = function (hours) {
  getUserStats(hours).then(function (a) {
    userStatsCreateJson(a).then(function (b) {
      statsDiscord(b, hours, 'USER')
    }).catch(function (err) { log(err, 'lc', logFile.info, discordRoom.bot) })
  }).catch(function (err) { log(err, 'lc', logFile.info, discordRoom.bot) })
}

let getSteamStats = (hours) => {
  return new Promise(function (resolve, reject) {
    knex.select('*').from('steamstats_server')
			.whereRaw('steamstats_server.created_at > (now() - \'' + hours + ' hour\'::interval)')
			.then(function (msg) {
  resolve(msg)
}).catch(function (err) {
  log(err, 'lc', logFile.info, discordRoom.bot)
  reject()
})
  })
}

let tempSteamStats = (data, hours) => {
  return new Promise(function (resolve, reject) {
    createTempStatsDB(hours).then(function () {
      for (let a in data) {
        for (let b in data[a].stats) {
          if (data[a].stats[b].value > 0) {
            knex('tempSteamStats' + hours).insert({
              data_time: data[a].created_at,
              steamid: data[a].steamid,
              name: data[a].stats[b].name,
              value: data[a].stats[b].value
            }).then(function () {
							// log('INSERT', 'lc', logFile.info, discordRoom.bot)
            }).catch(function (err) {
              log('LOG INSERT FAILED' + err, 'lc', logFile.info, discordRoom.bot)
            })
          }
        }
      }
      resolve()
    })
  })
}

let createTempStatsDB = (hours) => {
  return new Promise(function (resolve, reject) {
    knex.schema.dropTableIfExists('tempSteamStats' + hours).then(function () {
			// log('DROPPED', 'lc', logFile.info, discordRoom.bot)
      knex.schema.createTable('tempSteamStats' + hours, function (table) {
        table.increments()
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('data_time')
        table.bigint('steamid')
        table.text('name')
        table.bigint('value')
      }).then(function (make) {
        log('STEAM_AUDIT DB: tempSteamStats' + hours + ' CREATED', 'lc', logFile.info, discordRoom.bot)
        resolve()
      }).catch(function (err) {
        log(err, 'lc', logFile.info, discordRoom.bot)
      })
    })
  })
}

let getServerStats = (hours) => {
  return new Promise(function (resolve, reject) {
			// log('deleted', 'lc', logFile.info, discordRoom.bot)
    knex.select('name as stat')
				.sum('value as value')
				.from('tempSteamStats' + hours)
				.groupBy('name')
				.orderByRaw('SUM(value) DESC')
				.then(function (msg) {
  resolve(msg)
}).catch(function (err) {
  reject(err)
})
  })
}

let serverStatsCreateJson = (s) => {
  return new Promise(function (resolve, reject) {
    let statsJson = {}
    for (i in s) {
      let steamid = ['SERVER']
      let sname = [s[i].stat]
      let svalue = s[i].value
			// let [s[i].stat] = s[i].value

      if (!statsJson[steamid[0]]) {
        statsJson[steamid[0]] = {}
      }
      statsJson[steamid[0]].name = 'SERVER'
      if (ta = RegExp(/(^harvest)\.?(.+)?/).exec(sname[0])) {
        if (!statsJson[steamid[0]].harvest) {
          statsJson[steamid[0]].harvest = {}
        }
        let aname = [ta[2]]
        statsJson[steamid[0]].harvest[aname[0]] = svalue
      } else if (under = RegExp(/(^.+)\_(.+)/).exec(sname[0])) {
        if (!statsJson[steamid[0]][under[1]]) {
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

let getUserStats = (hours) => {
  return new Promise(function (resolve, reject) {
		// log('deleted', 'lc', logFile.info, discordRoom.bot)
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
			.then(function (msg) {
  resolve(msg)
}).catch(function (err) {
  reject(err)
})
  })
}

let serverStatsDiscord = (statsArray, hours) => {
  let cbRE = new RegExp('\\[\\d+:\\d+:\\d+\\] \\[SERVER\\]\\[' + hours + ' hours\\]```')
  discord.discordMessage.discordDeleteMessageType(discordRoom.general, cbRE).then(function (z) {
    var outmsg = '[SERVER][' + hours + ' hours]' + '```'
    for (let a in statsArray) {
      outmsg = outmsg + ('\n' + statsArray[a].name + ' : ' + statsArray[a].sum)
    }
    outmsg = outmsg + '```'
    log(outmsg, 'd', null, discordRoom.general)
  })
}

let sumArrayValues = (array) => {
  let sum = 0
  for (let a in array) {
    sum += parseInt(array[a])
  }
  return sum
}

let userStatsDiscord = (statsArray, hours) => {
  let cbRE = new RegExp('\\[\\d+:\\d+:\\d+\\] \\[USER\\]\\[' + hours + ' hours\\]\\[\\d+\\]')
  discord.discordMessage.discordDeleteMessageType(discordRoom.general, cbRE).then(function (z) {
    var outmsg = '[USER][' + hours + ' hours][0]'
    for (let a in statsArray) {
      outmsg += '\n```Css'

      let steamname = statsArray[a].name
      outmsg += '\n' + steamname

			// let blank = discord.discordMessage.fixedWidth(1, '', ' ')

			// let endMainLine = ':'
			// let endSubLine = ';'

      let subLine = ''
      let mainLine = ''

      let startMainLine = '\n-{'
      let endMainLine = ':'
      let startMainTotal = '#'
      let endMainTotal = '}\n--'
      let startSubLine = '{'
      let endSubLine = ':'
      let startSubTotal = '#'
      let endSubTotal = '}'

      let valueFill = ''
      let sent = 1
			// let  + endMainTotal

      let harvestTotal = sumArrayValues(statsArray[a].harvest)
      if (sumArrayValues(statsArray[a].harvest) > 0) {
        outmsg += (startMainLine + 'harvest' + endMainLine + startMainTotal + harvestTotal + endMainTotal)
      }
      for (let b in statsArray[a].harvest) {
        let insideStat = statsArray[a].harvest[b]
        outmsg += (startSubLine + b + endSubLine + startSubTotal + insideStat + endSubTotal)
      }

      let bulletTotal = sumArrayValues(statsArray[a].bullet_hit)
      if (sumArrayValues(statsArray[a].bullet_hit) > 0) {
        outmsg += (startMainLine + 'bullets' + endMainLine + startMainTotal + bulletTotal + endMainTotal)
      }
      for (let b in statsArray[a].bullet_hit) {
        let insideStat = statsArray[a].bullet_hit[b]
        let insideName = b
        outmsg += (startSubLine + insideName + endSubLine + startSubTotal + insideStat + endSubTotal)
      }

      let arrowTotal = sumArrayValues(statsArray[a].arrow_hit)
      if (sumArrayValues(statsArray[a].arrow_hit) > 0) {
        outmsg += (startMainLine + 'arrows' + endMainLine + startMainTotal + arrowTotal + endMainTotal)
      }
      for (let b in statsArray[a].arrow_hit) {
        let insideStat = statsArray[a].arrow_hit[b]
        let insideName = b
        outmsg += (startSubLine + insideName + endSubLine + startSubTotal + insideStat + endSubTotal)
      }

      let shotgunTotal = sumArrayValues(statsArray[a].shotgun)
      if (sumArrayValues(statsArray[a].shotgun) > 0) {
        outmsg += (startMainLine + 'shotgun' + endMainLine + startMainTotal + shotgunTotal + endMainTotal)
      }
      for (let b in statsArray[a].shotgun_hit) {
        let insideStat = statsArray[a].shotgun_hit[b]
        let insideName = b
        outmsg += (startSubLine + insideName + endSubLine + startSubTotal + insideStat + endSubTotal)
      }
      if ((outmsg.length / sent) > 1500) {
        outmsg += '\n```'
        log(outmsg, 'dl', logFile.discord, discordRoom.general)
        sent += 1
        outmsg = '[USER][' + hours + ' hours][' + outmsg.length + ']'
        outmsg += '\n```'
      } else {
        outmsg += '\n```'
      }
    }
    if (outmsg.length > 25) {
      log(outmsg, 'dl', logFile.discord, discordRoom.general)
    }

		// process.exit()
  })
}

statsDiscord = function (statsArray, hours, type) {
  let cbRE = new RegExp('\\[\\d+:\\d+:\\d+\\] \\[' + type + '\\]\\[' + hours + ' hours\\]\\[\\d+\\]')
  discord.discordMessage.discordDeleteMessageType(discordRoom.general, cbRE).then(function (z) {
    var outmsg = '[' + type + '][' + hours + ' hours][0]'
    for (let a in statsArray) {
      outmsg += '\n```Css'

      let steamname = statsArray[a].name
      outmsg += '\n' + steamname

			// let blank = discord.discordMessage.fixedWidth(1, '', ' ')

			// let endMainLine = ':'
			// let endSubLine = ';'

      let subLine = ''
      let mainLine = ''

      let startMainLine = '\n-{'
      let endMainLine = ':'
      let startMainTotal = '#'
      let endMainTotal = '}'
      let startSubLine = '\n--{'
      let endSubLine = ':'
      let startSubTotal = '#'
      let endSubTotal = '}'

      let valueFill = ''
      let sent = 1
			// let  + endMainTotal

      let harvestTotal = sumArrayValues(statsArray[a].harvest)
      if (sumArrayValues(statsArray[a].harvest) > 0) {
        outmsg += (startMainLine + 'harvest' + endMainLine + startMainTotal + harvestTotal + endMainTotal)
      }
      for (let b in statsArray[a].harvest) {
        let insideStat = statsArray[a].harvest[b]
        outmsg += (startSubLine + b + endSubLine + startSubTotal + insideStat + endSubTotal)
      }

      let bulletTotal = sumArrayValues(statsArray[a].bullet_hit)
      if (sumArrayValues(statsArray[a].bullet_hit) > 0) {
        outmsg += (startMainLine + 'bullets' + endMainLine + startMainTotal + bulletTotal + endMainTotal)
      }
      for (let b in statsArray[a].bullet_hit) {
        let insideStat = statsArray[a].bullet_hit[b]
        let insideName = b
        outmsg += (startSubLine + insideName + endSubLine + startSubTotal + insideStat + endSubTotal)
      }

      let arrowTotal = sumArrayValues(statsArray[a].arrow_hit)
      if (sumArrayValues(statsArray[a].arrow_hit) > 0) {
        outmsg += (startMainLine + 'arrows' + endMainLine + startMainTotal + arrowTotal + endMainTotal)
      }
      for (let b in statsArray[a].arrow_hit) {
        let insideStat = statsArray[a].arrow_hit[b]
        let insideName = b
        outmsg += (startSubLine + insideName + endSubLine + startSubTotal + insideStat + endSubTotal)
      }

      let shotgunTotal = sumArrayValues(statsArray[a].shotgun)
      if (sumArrayValues(statsArray[a].shotgun) > 0) {
        outmsg += (startMainLine + 'shotgun' + endMainLine + startMainTotal + shotgunTotal + endMainTotal)
      }
      for (let b in statsArray[a].shotgun_hit) {
        let insideStat = statsArray[a].shotgun_hit[b]
        let insideName = b
        outmsg += (startSubLine + insideName + endSubLine + startSubTotal + insideStat + endSubTotal)
      }
      let deathTotal = sumArrayValues(statsArray[a].death)
      if (deathTotal > 0) {
        outmsg += (startMainLine + 'deaths' + endMainLine + startMainTotal + deathTotal + endMainTotal)
      }
      for (let b in statsArray[a].death) {
        let insideStat = statsArray[a].death[b]
        let insideName = b
        outmsg += (startSubLine + insideName + endSubLine + startSubTotal + insideStat + endSubTotal)
      }
      let killTotal = sumArrayValues(statsArray[a].kill)
      if (deathTotal > 0) {
        outmsg += (startMainLine + 'kills' + endMainLine + startMainTotal + killTotal + endMainTotal)
      }
      for (let b in statsArray[a].kill) {
        let insideStat = statsArray[a].kill[b]
        let insideName = b
        outmsg += (startSubLine + insideName + endSubLine + startSubTotal + insideStat + endSubTotal)
      }
      if ((outmsg.length / sent) > 1500) {
        outmsg += '\n```'
				// console.lof(outmsg)
        log(outmsg, 'dl', logFile.discord, discordRoom.general)
        sent += 1
        outmsg = '[' + type + '][' + hours + ' hours][' + outmsg.length + ']'
        outmsg += '\n```'
      } else {
        outmsg += '\n```'
      }
    }
    if (outmsg.length > 30) {
			// log(outmsg, 'lc', logFile.info, discordRoom.bot)
      log(outmsg, 'dl', logFile.discord, discordRoom.general)
    }

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

let userStatsCreateJson = (s) => {
  return new Promise(function (resolve, reject) {
    let statsJson = {}
    for (i in s) {
      let steamid = [s[i].steamid]
      let sname = [s[i].stat]
      let svalue = s[i].value
			// let [s[i].stat] = s[i].value

      if (!statsJson[steamid[0]]) {
        statsJson[steamid[0]] = {}
      }
      statsJson[steamid[0]].name = s[i].steamname
      if (ta = RegExp(/(^harvest)\.?(.+)?/).exec(sname[0])) {
        if (!statsJson[steamid[0]].harvest) {
          statsJson[steamid[0]].harvest = {}
        }
        let aname = [ta[2]]
        statsJson[steamid[0]].harvest[aname[0]] = svalue
      } else if (under = RegExp(/(^.+)\_(.+)/).exec(sname[0])) {
        if (!statsJson[steamid[0]][under[1]]) {
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
