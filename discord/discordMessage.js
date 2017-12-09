// discordMessage.js

exports.discordMessageGate = function (msg) {
  // if the message is coming from the bot itself just ignore it
  if (msg.author.id === config.discordID) { return }
  switch (msg.channel.name) {
    // just delete anything in the general channel
    case (discordRoom.general):
      discordDeleteMessage(msg)
      break
      // use the logger to send rcon message to server
    case (discordRoom.chat):
      log(msg.author.username + ': ' + msg.content, 'lr', logFile.rcon, config.discordRooms.bot)
      // delete the message since it will show up from being displayed in the server
      discordDeleteMessage(msg)
      break
    case (discordRoom.rcon):
      // send rcon style commands
      discord.discordRcon.discordRconGate(msg)
        .then(m => {
          discordDeleteMessage(msg)
        })
        .catch(function (err) {
          log(err, 'lc', logFile.info, discordRoom.bot)
        })
      break
    case (discordRoom.log):
      // just delete anything anyone enteres in the log channel
      discordDeleteMessage(msg)
      break
    case (discordRoom.bot):
      discord.discordBot.discordBotGate(msg)
        .then(m => {
          discordDeleteMessage(msg)
        })
        .catch(function (err) {
          log(err, 'lc', logFile.info, discordRoom.bot)
        })
      break
    default:
      break
  }
}

exports.discordSendMessage = function (msg, pChannel) {
  let datetime = dateFormat(new Date(), '[mm-dd-yy hh:MM:ss] ')
  let time = dateFormat(new Date(), '[HH:MM:ss] ')
  let channel = bot.channels.find('name', pChannel)
// channel.startTyping()
// console.log(msg)
  switch (pChannel) {
    case (config.discordRooms.log):
      channel.sendMessage(datetime + msg)
      channel.stopTyping(true)
      break
    case (config.discordRooms.bot):
      channel.sendMessage(datetime + msg)
      channel.stopTyping(true)
      break
    default:
      channel.sendMessage(time + msg)
      channel.stopTyping(true)
  }
}

let discordDeleteMessage = (message) => {
// console.log(message)
  if (typeof message === 'string') { message = JSON.parse(playerList) }
  setTimeout(function () {
    message.delete().then(function (msg) {
      log(msg, 'l', logFile.discord, null)
    }).catch(function () {
      log('Delete message failed', 'lc', logFile.discord, null)
    })
  }, 2500)
}

exports.discordDeleteAllMessages = function (pChannel) {
  let channel = bot.channels.find('name', pChannel)
  channel.sendMessage('Gonna delete some stuff')
  channel.fetchMessages({limit: 100}).then(function (m) {
    channel.bulkDelete(m)
  }).catch(function (err) {
    log('## ' + err, 'lc', logFile.info, discordRoom.bot)
  })
}

exports.discordDeleteMessageType = function (pChannel, type) {
  return new Promise(function (resolve, reject) {
// log(type + ' ' + pChannel, 'lc', logFile.info, discordRoom.bot)
    let channel = bot.channels.find('name', pChannel)
    channel.fetchMessages({limit: 100}).then(function (m) {
// log(m, 'lc', logFile.info, discordRoom.bot)
      let filteredMessages = m.filter(findMessage.bind(this, type))
      filteredMessages.deleteAll()
      resolve()
    }).catch(function (err) {
      log('### ' + err, 'lc', logFile.info, discordRoom.bot)
    })
  })
}

let findMessage = (r, f) => {
  if (r.test(f.content)) { return f }
}

// discord.discordMessage.fixedWidth(10, )
exports.fixedWidth = function (width, str, chr) {
  if (!chr) { chr = ' ' }
  let i = width
  let pad = ''
  if (typeof str === 'undefined') {
    return pad
  }
  while (i--) {
    pad += chr
  }
  return (str + pad).substring(0, width)
}
