// timedCommands.js

exports.runTimedCommands = function() {
	setTimeout(function(){
		rust.rconListPlayers.getAndDisplayPlayers()
	}, 1000)

	setTimeout(function(){
		cpu.sql.sqlInserters.manualRefreshSteamStatsConnected()
	}, 10000)

	setTimeout(function(){
		cpu.steamStats.steamsStatsStart('4')
	}, 15000)


	
}


