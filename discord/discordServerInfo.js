// discordServerInfo.js
const moment = require('moment')
// moment().subtract(10, 'days').calendar();

exports.displayJsonInfo = function () {
  checkServerStatus().then(function () {
    checkPlayerList()
  })
.then(function () {
  outputServerStatus()
})
}

let checkServerStatus = () => {
  return new Promise(function (resolve, reject) {
    if (server.status) {
      if (moment(server.refresh.status).subtract(0, 'second') < moment().subtract(30, 'seconds')) {
// Status hasn't been updated in so long that its not displayed
        rust.rconStatus.getRconStatus().then(function () {
          resolve()
        }).catch(function (err) { log(err, 'lc', logFile.info, discordRoom.bot) })
      } else {
        resolve()
      }
    } else {
// Never Refreshed
      rust.rconStatus.getRconStatus().then(function () {
        resolve()
      }).catch(function (err) { log(err, 'lc', logFile.info, discordRoom.bot) })
    }
  })
}

let checkPlayerList = () => {
  return new Promise(function (resolve, reject) {
    if (server.refresh.player && moment(server.refresh.player).subtract(0, 'second') < moment().subtract(10, 'seconds')) {
// Status hasn't been updated in so long that its not displayed
      rust.rconListPlayers.getPlayerArray().then(function () {
        resolve()
      }).catch(function (err) { log(err, 'lc', logFile.info, discordRoom.bot) })
    } else {
      resolve()
    }
  })
}

let outputServerStatus = () => {
// log(z, 'lc', logFile.info, discordRoom.bot)

// log(server, 'lc', logFile.info, discordRoom.bot)
  for (let a in server) {
    switch (a) {
      case ('refresh'):
        log(server.refresh, 'lc', logFile.info, discordRoom.bot)
        break
      case ('players'):
        discord.discordRconSend.playerList()
        break
      case ('status'):
        discord.discordRconSend.status()
        break
      default:
        let cbRE = new RegExp('\\[\\d+:\\d+:\\d+\\] \\[UNSORTED\\]\\[\\d+\\]')
        discord.discordMessage.discordDeleteMessageType(discordRoom.rcon, cbRE)
          .then(function (z) {
            let outmsg = '[UNSORTED][0]'
            outmsg += '\n```Css'
            outmsg += '\n#' + a

            let startMainLine = '\n-{'
            let endMainLine = ':'
            let startMainTotal = '#'
            let endMainTotal = '}'
            let startSubLine = '\n--{'
            let endSubLine = ':'
            let startSubTotal = '#'
            let endSubTotal = '}'

            let sent = 1

            for (let b in server[a]) {
// log(server[a][b], 'lc', logFile.info, discordRoom.bot)

              if (b === 'x') {

              } else if (b === 'refresh') {
                outmsg += (startMainLine + b + endMainLine + startMainTotal + moment(server[a][b]).format('MM/DD HH:mm:SS') + endMainTotal)
              } else {
                outmsg += (startMainLine + b + endMainLine + startMainTotal + endMainTotal)
                for (let c in server[a][b]) {
                  outmsg += (startSubLine + c + endSubLine + startSubTotal + server[a][b][c] + endSubTotal)
                }
              }
            }

            if ((outmsg.length / sent) > 1500) {
              outmsg += '\n```'
// console.lof(outmsg)
              log(outmsg, 'dl', logFile.discord, discordRoom.general)
              sent += 1
              // outmsg = '[' + type + '][' + hours + ' hours][' + outmsg.length + ']'
              outmsg += '\n```'
            } else {
              outmsg += '\n```'
              log(outmsg, 'd', logFile.discord, discordRoom.rcon)
            }
          })
    }
  }
}
