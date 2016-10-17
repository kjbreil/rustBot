// rconCommands.js

exports.getRconStatus = function() {
	return new Promise(function(resolve, reject) {
		rcon.run('status').then(function(m) {
			// log(m, 'lc', logFile.info, discordRoom.bot)
			let extractor = new RegExp(/^hostname: (.+)\nversion : (\d+) (\w+) \((.+?)\)\nmap +: (.+)\nplayers +: (\d{1,3}) \((\d{1,3}) max\) \((\d{1,3}) queued\) \((\d{1,3}) joining\)\n/)
			let e = extractor.exec(m.message)
			// let sj = {}
			server.status = {}
			server.status.info = {}
			server.status.info.serverName = e[1]
			server.status.info.serverVersion = e[2]
			server.status.x = {}
			server.status.x.secure = e[3]
			server.status.x.secureInfo = e[4]
			server.status.x.mapType = e[5]
			server.status.players = {}
			server.status.players.connected = e[6]
			server.status.players.maxPlayers = e[7]
			server.status.players.queuedPlayers = e[8]
			server.status.players.joiningPlayers = e[9]
			server.refresh.status = new Date().getTime()
			resolve()
		}).catch(function(err) {
			reject()
		})
	})
}

exports.rconStatus = function(m, r) {
	/*This regex is fun, lots of data can be used from here.
			Matching Array
			1 - Server Name
			2 - Server Version
			3 - Secure?
			4 - More secure info like steam connection
			5 - Map type (not seed)
			6 - Connected players
			7 - Max players
			8 - queued players
			9 - joining players
	*/
	let extractor = new RegExp(/^hostname: (.+)\nversion : (\d+) (\w+) \((.+?)\)\nmap +: (.+)\nplayers +: (\d{1,3}) \((\d{1,3}) max\) \((\d{1,3}) queued\) \((\d{1,3}) joining\)\n/)
    let RE = (/\[\d{1,2}\:\d{1,2}\:\d{1,2}\] \[\*status\*:\*\*\*st\*\*\*\]/)
    let e = extractor.exec(m.Message)
    let text = '**' + e[1] + '** : ' + e[2] + ' : ' + e[3]
    text = text + ' : **' + e[6] + '** Connected : ' + e[9] + ' Joining : ' + e[8] + ' Queued'
    discordDeleteMessageType(config.discordRooms.rcon, RE).then(function (z) {
		base.log('[*status*:***st***] ' + text, 'lcd', null, config.discordRooms.rcon)
    }).catch(function (err) {
        log(err, 'lc', logFile.info, discordRoom.bot)
    })
}

exports.returnStatus = function(m, r) {
	/*This regex is fun, lots of data can be used from here.
			Matching Array
			1 - Server Name
			2 - Server Version
			3 - Secure?
			4 - More secure info like steam connection
			5 - Map type (not seed)
			6 - Connected players
			7 - Max players
			8 - queued players
			9 - joining players
	*/
	let extractor = new RegExp(/^hostname: (.+)\nversion : (\d+) (\w+) \((.+?)\)\nmap +: (.+)\nplayers +: (\d{1,3}) \((\d{1,3}) max\) \((\d{1,3}) queued\) \((\d{1,3}) joining\)\n/)
    let e = extractor.exec(m.Message)
    playersConnected = e[6]
    playersQueued = e[8]
    playersJoining = e[9]
}