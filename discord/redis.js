
const snd = require('./message.js').snd

var exports = module.exports = {}

exports.pop = function(msg) {
	popChat()
}

let popChat = function() {
	clientBlocking.brpopAsync('chat', 0)
	.then( kv => {
		snd(kv[1], 'chat')
		popChat()
	})
	.catch( err => {
		console.log(err)
		popChat()
	})
}