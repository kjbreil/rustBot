// playerList.js

/*

  {
    "SteamID": "76561198024599044",
    "OwnerSteamID": "0",
    "DisplayName": "Feral Terrel",
    "Ping": 37,
    "Address": "71.56.155.10:56814",
    "ConnectedSeconds": 463,
    "VoiationLevel": 0.0,
    "CurrentLevel": 4.0,
    "UnspentXp": 5.0,
    "Health": 59.7555847
  }

*/
exports.discordDisplayPlayers = function(a){
	a = JSON.parse(a.Message)
    let plRE = new RegExp(/^.+ \[__\*\*\d{1,2}\*\*__\]\[\*listplayers\*\:\*\*\*lp\*\*\*\]/)
    discordDeleteMessageType(config.discordRooms.rcon, plRE).then(function (z) {
		if (a !== '\[\]') {  
			// console.log(a)
			playersOnline = '[__**' + a.length + '**__][*listplayers*:***lp***][DisplayName : SteamID : Ping : Level : XP : Health]'
			finalMessage = ''
			for(var i in a) {
				finalMessage = finalMessage + '\n[__' + a[i].DisplayName + '__ : ' + a[i].SteamID + ' : ' + a[i].Ping + ' : '
				finalMessage = finalMessage + a[i].CurrentLevel + ' : ' + a[i].UnspentXp + ' : ' + a[i].Health + ']'
			}
			base.log(playersOnline + finalMessage, 'lcd', 'rustbot.log', config.discordRooms.rcon)
		} else {
			base.log('[__**0**__][*listplayers*:***lp***][DisplayName : SteamID : Ping : Level : XP : Health]', 'lcd', 'rustbot.log', config.discordRooms.rcon)
		}
    })
}