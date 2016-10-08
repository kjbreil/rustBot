// rustGeneric.js


let deathRE = new RegExp(/.*\[\d{1,5}\/\d{15,18}\]/)
let eventRE = new RegExp(/^\[event\] (.+?) (.+?)$/)


exports.rustGenericGate = function(msg) {
	// msg.message | msg.time
	if(deathRE.test(msg.message)) {
		rust.rustDeath.deathMessageIF(msg.message)
	} else if (eventRE.test(msg.message)) { 
		log('GenericEvent' + msg.message, 'l', logFile.rustbot, null)
	} else {
		log('Generic Nothing' + msg.message, 'l', logFile.rustbot, null)
	}
}