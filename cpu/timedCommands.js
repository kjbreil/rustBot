// timedCommands.js  steamUserStats

exports.runTimedCommands = function() {
	log('TIMED COMMANDS STARTING', 'lc', logFile.info, discordRoom.bot)
	setTimeout(function(){
		rust.rconListPlayers.getAndDisplayPlayers()
		log('REFRESH PLAYER LIST', 'lc', logFile.info, discordRoom.bot)
	}, 1000)

	// setTimeout(function(){
	// 	cpu.sql.sqlInserters.manualRefreshSteamStatsConnected()
	// 	log('MANUAL REFRESH STEAM STATS', 'lc', logFile.info, discordRoom.bot)
	// }, 2000)
	// setTimeout(function(){
	// 	cpu.steamStats.steamServerStats('4')
	// 	log('MANUAL CALCULATE IF NEEDED 4 HOURS', 'lc', logFile.info, discordRoom.bot)
	// }, 5000)

	// setTimeout(function(){
	// 	cpu.steamStats.steamServerStats('24')
	// 	log('MANUAL CALCULATE IF NEEDED 24 HOURS', 'lc', logFile.info, discordRoom.bot)
	// }, 6000)
	// setTimeout(function(){
	// 	cpu.steamStats.steamUserStats('24')
	// 	log('MANUAL CALCULATE USER STATS 24 HOURS', 'lc', logFile.info, discordRoom.bot)
	// }, 8000)
}


