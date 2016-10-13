// timedCommands.js

exports.runTimedCommands = function() {
	setTimeout(function(){
		rust.rconListPlayers.getAndDisplayPlayers()
	}, 1000)

	setTimeout(function(){
		cpu.sql.sqlInserters.manualRefreshSteamStatsConnected()
	}, 10000)
}


