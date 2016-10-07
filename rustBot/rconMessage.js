// rconOn.js

exports.rconMessageGate = function(msg) {
	if(msg.identifier > 1000) {

	} else {
		rustBot.logger.log(msg, 'c', null, null)
	}
	
}