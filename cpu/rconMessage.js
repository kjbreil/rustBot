// rconOn.js


exports.rconMessageGate = function(msg) {
	if(msg.identity > 1000) {
		// Message has an identifier, should've been returned by a promise
	} else {
		log(msg, 'c', null, null)
	}
	
}