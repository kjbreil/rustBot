// rconOn.js

/*
ServerMessage {
message: '',
type: 'Generic',
stacktrace: null,
identity: 1002,
time: 1475854036528 }
*/

exports.rconMessageGate = function (msg) {
  cpu.sql.sqlInserters.sqlInsertersGate(msg, 'log')
  log(msg, 'l', logFile.rcon, null)
  if (msg.identity > 1000) {
    // Message has an identifier, should've been returned by a promise
  } else {
    // if((/^\[.+\] /).test(msg.message)) {return;}
    switch (msg.type) {
      case ('Chat'):
        // log('inside chat', 'lc', logFile.info, discordRoom.bot)
        rconChatMessage(msg)
        break
      case ('Generic'):
        rust.rustGeneric.rustGenericGate(msg)
        break
      default:
        break
    }
  }
}

let rconChatMessage = (msg) => {
  cpu.sql.sqlInserters.sqlInsertersGate(msg.message, 'chat')
  if ((/^\[.+\] /).test(msg.message)) {
    log('Event in Chat', 'lc', logFile.info, discordRoom.bot)
    return
  }
  msg = JSON.parse(msg.message)
  if (msg.Username === 'SERVER' && RegExp(/^<color=#/).test(msg.Message)) {
    log(msg.Username + ': ' + msg.Message, 'l', logFile.chat, discordRoom.chat)
  } else {
    log(msg.Username + ': ' + msg.Message, 'ld', logFile.chat, discordRoom.chat)
  }
}
