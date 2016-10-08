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
	log(msg, 'l', logFile.rcon, null)
	if(msg.identity > 1000) {
		// Message has an identifier, should've been returned by a promise
	} else {
		if((/^\[.+\] /).test(msg.message)) {return;}
		switch(msg.type) {
			case('Chat'):
				// console.log('inside chat')
				rconChatMessage(msg)
				break;
			case('Generic'):
				rust.rustGeneric.rustGenericGate(msg)
				break;
			default:
				break;
		}
	}
}


rconChatMessage = function(msg) {
	msg = JSON.parse(msg.message)
	if(msg.Username === 'SERVER' && RegExp(/^<color=#/).test(msg.Message)){
		log(msg.Username + ': ' + msg.Message, 'l', logFile.chat, discordRoom.chat)
	} else {
		log(msg.Username + ': ' + msg.Message, 'ld', logFile.chat, discordRoom.chat)		
	}
}