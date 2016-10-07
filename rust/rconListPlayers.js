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
exports.getAndDisplayPlayers = function() {
    rcon.run('global.playerlist').then(function(msg){
    	a = msg.message
        let plRE = new RegExp(/^.+ \[__\*\*\d{1,2}\*\*__\]\[\*listplayers\*\:\*\*\*lp\*\*\*\]/)
        discord.discordMessage.discordDeleteMessageType(discordRoom.rcon, plRE).then(function (z) {
    		if (a !== '\[\]') {
    			playersOnline = '[__**' + a.length + '**__][*listplayers*:***lp***][DisplayName : SteamID : Ping : Level : XP : Health]'
    			finalMessage = ''
    			for(var i in a) {
    				finalMessage = finalMessage + '\n[__' + a[i].DisplayName + '__ : ' + a[i].SteamID + ' | P:' + a[i].Ping + ' | L:'
    				finalMessage = finalMessage + a[i].CurrentLevel + ' | X:' + a[i].UnspentXp + ' | H:' + a[i].Health + ']'
    			}
    			log(playersOnline + finalMessage, 'ld', logFile.rustbot, discordRoom.rcon)
    		} else {
    			log('[__**0**__][*listplayers*:***lp***][DisplayName | SteamID | Ping | Level | XP | Health]', 'ld', logFile.rustbot, discordRoom.rcon)
    		}
        })
    })
}