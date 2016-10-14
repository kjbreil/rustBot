// schCmds.js


const CronJob = require('cron').CronJob

//  # ┌────────────── second (optional)
//  # │ ┌──────────── minute
//  # │ │ ┌────────── hour
//  # │ │ │ ┌──────── day of month
//  # │ │ │ │ ┌────── month
//  # │ │ │ │ │ ┌──── day of week
//  # │ │ │ │ │ │
//  # │ │ │ │ │ │
//  # * * * * * *

// cron.schedule('* * * * *', function(){
//   console.log('running a task every minute');
// });

// exports.runScheduledCommands = function() {
// 	console.log('INSERTING SCHEDULED COMMANDS')
// 	cron.schedule('0 2 13 * * *', function(){
// 		console.log('RUNNING RESTART COMMAND')
// 		let grace = 900
// 		rcon.run('global.restart ' + (grace + 15)).then(function(line) {
// 			restartCountDown(grace)
// 		})
// 	})
// }

exports.runScheduledCommands = function() {
	console.log('INSERTING SCHEDULED COMMANDS')
	rconRestartServer.start()
	manualRefreshStats.start()
	refreshServerStats.start()
}

var refreshServerStats = new CronJob({
	cronTime: '0 * */1 * * *',
	onTick: function() {
		console.log('REFRESHING TOP SERVER STATS')
		cpu.steamStats.steamsStatsStart('24')
	},
	start: false,
	timeZone: 'America/Los_Angeles'
})

var manualRefreshStats = new CronJob({
	cronTime: '0 */15 * * * *',
	onTick: function() {
		console.log('REFRESHING PLAYER STATS')
		cpu.sql.sqlInserters.manualRefreshSteamStatsConnected()
	},
	start: false,
	timeZone: 'America/Los_Angeles'
})

var rconRestartServer = new CronJob({
	cronTime: '00 45 2 * * *',
	onTick: function() {
		console.log('RUNNING RESTART COMMAND')
		let grace = 900
		rcon.run('global.restart ' + (grace + 15)).then(function(line) {
		restartCountDown(grace)
		})
	},
	start: false,
	timeZone: 'America/Los_Angeles'
})


restartCountDown = function(time) {
	timeMilliseconds = time * 1000
	timeMinutes = timeMilliseconds / 60000 //15 minutes
	timer = [0, timeMilliseconds / 3, timeMilliseconds / 1.5, timeMilliseconds / 1.2, timeMilliseconds / 1]
	for(let i in timer) {
		setTimeout(function(){
			let timeLeft = timeMilliseconds - timer[i]
			let readableLeft = ((timeLeft/1000/60) << 0) + ':' + (String("00" + (timeLeft/1000) % 60).slice(-2))
			log('rustBot: server restart in ' + readableLeft, 'lr', logFile.rustbot, discordRoom.chat)
		}, timer[i])		
	}
}


