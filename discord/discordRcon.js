// discordRcon.js

exports.discordRconGate = function (msg) {
  return new Promise(function (resolve, reject) {
    let msgArray = RegExp(/(^\S+)\s?(.*?)?\s?(\S*)?$/).exec(msg.content)
    let cmd = msgArray[1].toLowerCase()

    let commandArray = discord.discordResponders.rconChannelCommands.find(findCommand.bind(this, cmd))
// log(commandArray, 'lc', logFile.info, discordRoom.bot)
    if (commandArray) {
      if (commandArray.rcon) {
        rconCommandSwitch(msgArray, commandArray)
      } else if (commandArray.cmd === 'help') {
        rconCommandHelp()
      } else { log(msg.author.username + ' tried command "' + cmd + '" but it is not setup correctly as an rcon command', 'l', logFile.discord, null) }
    } else {
      log(msg.author.username + ' tried command "' + cmd + '" it was not found', 'l', logFile.discord, null)
    }
    resolve(msg)
  })
}

let findCommand = (cmd, f) => {
  return (f.cmd === cmd || f.scmd === cmd)
}

let rconCommandSwitch = (ma, ca) => {
  switch (ca.cmd) {
    case ('listplayers'):
      rust.rconListPlayers.getAndDisplayPlayers(ma)
      break
    case ('status'):
      discord.discordServerInfo.displayJsonInfo()
      break
    case ('getplayers'):
      rust.rconListPlayers.getPlayerArray().then(function (msg) {
        log(server, 'lc', logFile.info, discordRoom.bot)
      })
      break
    default:
      log('something went wrong', 'lc', logFile.info, discordRoom.bot)
      break
  }
}

let rconCommandHelp = () => {

}
