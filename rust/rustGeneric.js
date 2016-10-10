// rustGeneric.js
// ^(.+)\[(\d+)\/(\d+)\] was killed by (.+) \(entity\)
global.listPlayersUnlock = 1
let deathRE = new RegExp(/.*\[\d+\/\d+\]/)
let eventRE = new RegExp(/^\[event\] (.+?) (.+?)$/)
let clientRE  = new RegExp(/^(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\:\d{1,6})\/(\d+?)\/(.+)/);


exports.rustGenericGate = function(msg) {
	// msg.message | msg.time
	console.log('Generic Gate ' + msg.message)
	if(deathRE.test(msg.message)) {
		rust.rustDeath.deathMessageIF(msg.message)
	} else if (eventRE.test(msg.message)) { 
		console.log('event RE match ' + msg.message)
		rust.rustEvent.rustEventGate(msg.message)
		log('GenericEvent ' + msg.message, 'l', logFile.rustbot, null)
	} else if (clientRE.test(msg.message)) {
		// console.log(msg)
		log(msg.message, 'ld', logFile.connect, discordRoom.log)
		if (listPlayersUnlock) {
			listPlayersUnlock = null
			setTimeout(function(){
				rust.rconListPlayers.getAndDisplayPlayers()
				listPlayersUnlock = 1
			}, 10000)
		}
		
	} else {
		log('Generic Nothing ' + msg.message, 'l', logFile.rustbot, null)
	}

}