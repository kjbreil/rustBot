// rconCommands.js

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
    })
}