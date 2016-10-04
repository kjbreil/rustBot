// chat.js

const base = require("./../lib/base");
const config = require('./../config.js');

chatRE = new RegExp(/\[CHAT\] (.+?)\[\d*\/(\d+)] : (.+)/);

exports.chatIF = function (line) {
	base.log(line, 1);
	names = chatRE.exec(line)
	base.log(names[1] + ': ' + names[3], 'lcd', 'chat.log', config.discordRooms.chat)
	// if(discordEnabled == 1) {discordMessage(names[1] + ': ' + names[3], 'chat')}
}

exports.chatArray = function (msg){
	base.log(msg.Message + ': ' + msg.Username, 'lcd', 'chat.log', config.discordRooms.chat)
}