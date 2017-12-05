// steamApi.js

// http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=252490&key=515CB46744050C7F42E500E02163E9DD&steamid=76561198125564678

// API = config.steamApiKey

var SteamApi = require('steam-api')
var userStats = new SteamApi.UserStats(config.steamApiKey)


exports.getSteamStats(steamid) {
	return new Promise(function(resolve, reject)) {
		userStats.GetUserStatsForGame('252490', steamid).then(function(result){
			resolve(result);
		}).catch(function (err) {
	        log(err, 'lc', logFile.info, discordRoom.bot)
	    })
	}
}