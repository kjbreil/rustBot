// playerList.js

exports.discordDisplayPlayers = function(a){
	a = a.Message
	playerListWait = 1
    let plRE = new RegExp(/^.+ \[__\*\*\d{1,2}\*\*__\]\[\*listplayers\*\:\*\*\*lp\*\*\*\]/)
    discordDeleteMessageType(config.discordRooms.rcon, plRE).then(function (z) {
		if (a !== '\[\]') {  
			playersOnline = '[__**' + a.length + '**__][*listplayers*:***lp***][DisplayName : SteamID : Ping]'
			finalMessage = ''
			for(var i in a) {
				finalMessage = finalMessage + '\n[__' + a[i].DisplayName + '__ : ' + a[i].SteamID + ' : ' + a[i].Ping + ']'
			}
			base.log(playersOnline + finalMessage, 'lcd', 'rustbot.log', config.discordRooms.rcon)
		} else {
			base.log('[__**0**__][*listplayers*:***lp***][DisplayName : SteamID : Ping]', 'lcd', 'rustbot.log', config.discordRooms.rcon)
		}
    })
}