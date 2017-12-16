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
//   log('running a task every minute', 'lc', logFile.info, discordRoom.bot);
// });

exports.runScheduledCommands = function () {
  log('INSERTING SCHEDULED COMMANDS', 'lc', logFile.info, discordRoom.bot)
  rconRestartServer.start()
  manualRefreshStats.start()
  refreshServerStats24.start()
  refreshServerStats4.start()
  refreshUserStats24.start()
  refreshRconStatus.start()
}

var refreshRconStatus = new CronJob({
  cronTime: '0 */10 * * * *',
  onTick: function () {
    log('REFRESHING STATUS', 'lc', logFile.info, discordRoom.bot)
    discord.discordServerInfo.displayJsonInfo()
  },
  start: false,
  timeZone: 'America/Los_Angeles'
})

var refreshUserStats24 = new CronJob({
  cronTime: '0 45 * * * *',
  onTick: function () {
    log('REFRESHING USER STATS', 'lc', logFile.info, discordRoom.bot)
    cpu.steamStats.steamUserStats('24')
  },
  start: false,
  timeZone: 'America/Los_Angeles'
})

var refreshServerStats24 = new CronJob({
  cronTime: '0 30 * * * *',
  onTick: function () {
    log('REFRESHING TOP SERVER STATS', 'lc', logFile.info, discordRoom.bot)
    cpu.steamStats.steamServerStats('24')
  },
  start: false,
  timeZone: 'America/Los_Angeles'
})

var refreshServerStats4 = new CronJob({
  cronTime: '0 */15 * * * *',
  onTick: function () {
    log('REFRESHING TOP SERVER STATS', 'lc', logFile.info, discordRoom.bot)
    cpu.steamStats.steamServerStats('4')
  },
  start: false,
  timeZone: 'America/Los_Angeles'
})

var manualRefreshStats = new CronJob({
  cronTime: '0 */15 * * * *',
  onTick: function () {
    log('REFRESHING PLAYER STATS', 'lc', logFile.info, discordRoom.bot)
    cpu.sql.sqlInserters.manualRefreshSteamStatsConnected()
  },
  start: false,
  timeZone: 'America/Los_Angeles'
})

// var rconRestartServer = new CronJob({
//   cronTime: '00 45 2 * * *',
//   onTick: function () {
//     log('RUNNING RESTART COMMAND', 'lc', logFile.info, discordRoom.bot)
//     let grace = 900
//     rcon.run('global.restart ' + (grace + 15)).then(function (line) {
//       restartCountDown(grace)
//     })
//   },
//   start: false,
//   timeZone: 'America/Los_Angeles'
// })

let restartCountDown = (time) => {
  timeMilliseconds = time * 1000
  timeMinutes = timeMilliseconds / 60000 // 15 minutes
  timer = [0, timeMilliseconds / 3, timeMilliseconds / 1.5, timeMilliseconds / 1.2, timeMilliseconds / 1]
  for (let i in timer) {
    setTimeout(function () {
      let timeLeft = timeMilliseconds - timer[i]
      let readableLeft = ((timeLeft / 1000 / 60) << 0) + ':' + (String('00' + (timeLeft / 1000) % 60).slice(-2))
      log('rustBot: server restart in ' + readableLeft, 'lr', discordRoom.chat, logFile.rustbot)
    }, timer[i])
  }
}
