// playerList.js

exports.discordDisplayPlayers = function(a){
	a = a.Message
	playerListWait = 1
	if (a) {  
		playersOnline = '[**' + a.length + '**][***lp***][DisplayName : SteamID : Ping]'
		finalMessage = ''
		for(var i in a) {
			finalMessage = finalMessage + '\n[__' + a[i].DisplayName + '__ : ' + a[i].SteamID + ' : ' + a[i].Ping + ']'
		}
		base.log(playersOnline + finalMessage, 'lcd', 'rustbot.log', config.discordRooms.rcon)
	} else {
		base.log('[**0**][***lp***][DisplayName : SteamID : Ping]', 'lcd', 'rustbot.log', config.discordRooms.rcon)
	}
	
}