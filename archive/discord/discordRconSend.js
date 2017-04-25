// discordRconSend.js

exports.playerList = function(full) {
	let st = '\n'
	let cbRE = new RegExp("\\[\\d+:\\d+:\\d+\\] \\[PLAYER LIST\\]\\[\\d+\\]\\[\\*\\*\\d+\\*\\*\\]")
	discord.discordMessage.discordDeleteMessageType(discordRoom.rcon, cbRE).then(function (z) {
		let sp = server.players
		if(typeof sp == "string") {sp = JSON.parse(sp)}
		let outmsg = '[PLAYER LIST][0][**' + sp.length + '**]'
		outmsg += st + '```CSS\n'
		if (!full) {
			for (let a in sp) {
				outmsg += st + sp[a].DisplayName + ' {SI:#' + sp[a].SteamID + '}{PING:#' + sp[a].Ping + '}'
				outmsg += '{OSI:#' + sp[a].OwnerSteamID + '}{IP:#' + sp[a].Address + '}{V:#' + sp[a].VoiationLevel + '}'
				outmsg += '{H:#' + sp[a].Health + '}{L:#' + sp[a].CurrentLevel + '}{X:#' + sp[a].UnspentXp + '}'
			}
		} else {
			for (let a in sp) {

				outmsg += st + sp[a].DisplayName + '{PING:#' + sp[a].Ping + '}'
				outmsg += '{V:#' + sp[a].VoiationLevel + '}'
				outmsg += '{H:#' + sp[a].Health + '}{L:#' + sp[a].CurrentLevel + '}{X:#' + sp[a].UnspentXp + '}'
			}
		}
		outmsg += '\n```'
		// log(outmsg, 'lc', logFile.info, discordRoom.bot)
		log(outmsg, 'dl', logFile.discord, discordRoom.rcon)
	}).catch(function(err){
		log(err, 'lc', logFile.info, discordRoom.bot)
	})
}

exports.status = function(full) {
	let st = '\n'

	let cbRE = new RegExp("\\[\\d+:\\d+:\\d+\\] \\[STATUS\\]\\[\\d+\\]")
	discord.discordMessage.discordDeleteMessageType(discordRoom.rcon, cbRE).then(function (z) {
		
		// log(server, 'lc', logFile.info, discordRoom.bot)

		let outmsg = '[STATUS][0]'
		outmsg += st + '```CSS\n'


		outmsg += st + server.status.info.serverName + ' {SV:#' + server.status.info.serverVersion + '}{' + server.status.x.secure + '}'
		outmsg += st + '{C:#' + server.status.players.connected + '}{J:#' + server.status.players.joiningPlayers + '}{Q:#' + server.status.players.queuedPlayers + '}{M:#' + server.status.players.maxPlayers + '}'
		
		outmsg += '\n```'
		// log(outmsg, 'lc', logFile.info, discordRoom.bot)
		log(outmsg, 'd', logFile.discord, discordRoom.rcon)
	}).catch(function(err){
		log(err, 'lc', logFile.info, discordRoom.bot)
	})
}

fw = function(width, str, chr, rev) {
    if(!chr){chr = ' '}
    if (typeof str === 'undefined') {
        return pad
    }

    let i = width
    let pad = ''
    while(i--) {
        pad += chr
    }
    if (rev) {
	    return (pad + str).slice(-width)
	} else {
		return (str + pad).substring(0, width)
	}
}