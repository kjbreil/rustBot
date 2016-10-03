// serverMessage.js

const base = require("./../lib/base");

// Regex for matcher
serverMessageRE = RegExp(/\[RCON\]\[\d{1,3}.\d{1,3}.\d{1,3}.\d{1,3}:\d{1,}\] say (.+)/);

serverArrayRE = RegExp(/\{\n\s+\"(.+)\"\: \"(.+)\"\,\n\s+\"(.+)\"\:\s(\d+),\n\s+\"(.+)\"\: \"(.+)\"\,\n\s+\"(.+)\"\: \"(.+)\"\,\n\s+\"(.+)\"\:\s(\d+)\n\}/)

exports.serverMessageIF = function (line) {
	// base.log(line, 'l');
	message = serverMessageRE.exec(line)
	base.log('SERVER: ' + message[1], 'lcd', 'chat.log')
}

exports.serverArrayIF = function (line) {
	// base.log(line, 'l');
	message = serverArrayRE.exec(line)

	colorMsgRE = RegExp(/^<color\=\#.{1,6}\>/)
	if (colorMsgRE.test(message[2])) {base.log(message[6] + ': ' + message[2], 'l')}
	else if (message[4] == 0) {base.log(message[6] + ': ' + message[2], 'ld', 'chat.log', 'chat')}
}
