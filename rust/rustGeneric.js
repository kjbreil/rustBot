// rustGeneric.js


deathMessageRE = new RegExp(/.*\[\d{1,5}\/\d{15,18}\]/)

exports.rustGenericGate = function(msg) {
	// msg.message | msg.time
	if(deathMessageRE.test(msg.message)) {
		rust.rustDeath.deathMessageIF(msg.message)
	}


}