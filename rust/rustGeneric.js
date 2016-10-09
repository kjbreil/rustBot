// rustGeneric.js


let deathRE = new RegExp(/.*\[\d{1,5}\/\d{15,18}\]/)
let eventRE = new RegExp(/^\[event\] (.+?) (.+?)$/)
let clientRE  = new RegExp(/^(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\:\d{1,6})\/(\d+?)\/(.+)/);


exports.rustGenericGate = function(msg) {
	// msg.message | msg.time
	if(deathRE.test(msg.message)) {
		rust.rustDeath.deathMessageIF(msg.message)
	} else if (eventRE.test(msg.message)) { 
		rust.rustEvent.rustEventGate(msg.message)
		log('GenericEvent ' + msg.message, 'l', logFile.rustbot, null)
	} else if (clientRE.test(msg.message)) {
		log(msg.message, 'ld', logFile.connect, discordRoom.log);
	} else {
		log('Generic Nothing ' + msg.message, 'l', logFile.rustbot, null)
	}

}