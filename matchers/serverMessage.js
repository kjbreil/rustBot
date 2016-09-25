// serverMessage.js

const base = require("./../lib/base");

// Regex for matcher
serverMessageRE = RegExp(/\[RCON\]\[\d{1,3}.\d{1,3}.\d{1,3}.\d{1,3}:\d{1,}\] say (.+)/);

exports.serverMessageIF = function (line) {
	base.log(line, 1);
	message = serverMessageRE.exec(line)
	base.log('SERVER: ' + message[1], 2, 'chat.log')
	if(discordEnabled == 1) {discordMessage('SERVER: ' + message[1])}
}