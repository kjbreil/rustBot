// timedCommands.js  steamUserStats

exports.runTimedCommands = function() {
	setTimeout(function(){
		rust.rconListPlayers.getAndDisplayPlayers()
	}, 1000)

	setTimeout(function(){
		cpu.sql.sqlInserters.manualRefreshSteamStatsConnected()
	}, 2000)

		setTimeout(function(){
		cpu.steamStats.steamServerStats('4')
	}, 5000)

	setTimeout(function(){
		cpu.steamStats.steamServerStats('24')
	}, 6000)
	setTimeout(function(){
		cpu.steamStats.steamUserStats('24')
	}, 8000)
}


