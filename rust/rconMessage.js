// rconOn.js

/*
ServerMessage {
  message: '',
  type: 'Generic',
  stacktrace: null,
  identity: 1002,
  time: 1475854036528 }
*/

exports.rconMessageGate = function(msg) {
	log(JSON.stringify(msg), 'l', logFile.rcon, null)
	if(msg.identity > 1000) {
		// Message has an identifier, should've been returned by a promise
	} else {
		log(msg, 'l', logFile.rust, null)
		if(msg.type == 'Chat') {rconChatMessage(msg)}
	}
}

rconChatMessage = function(msg) {
	msg = JSON.parse(msg.message)
	log(msg.Username + ': ' + msg.Message, 'ld', logFile.chat, discordRoom.chat)
}