// chat.js

const base = require("./../lib/base");

chatRE = new RegExp(/\[CHAT\] (.+?)\[\d*\/(\d+)] : (.+)/);

exports.chatIF = function (line) {
	base.log(line, 1);
	names = chatRE.exec(line)
	base.log(names[1] + ': ' + names[3], 2, 'chat.log')
}