// fps.js

const base = require("./../lib/base");
const config = require('./../config.js');

fpsRE = new RegExp(/^(\d{1,3}) FPS/)

exports.fpsIF = function(msg) {
	msg = msg.Message
	let dfpsRE = (/^\[.+\] \[\*\*\*fps\*\*\*\] \d{1,3} FPS/)
    // discordDeleteMessageType(config.discordRooms.rcon, dfpsRE)
    discordDeleteMessageType(config.discordRooms.rcon, dfpsRE).then(function (z) {
		base.log('[***fps***] ' + msg, 'lcd', null, config.discordRooms.rcon)
    })
}

ddmt = function(channel, type) {
	return new Promise(function (resolve, reject) {
	    channel = bot.channels.find('name', channel)
	    channel.fetchMessages({limit : 100}).then(function (m) {
	        filteredMessages = m.filter(findMessage.bind(this, type))
	        filteredMessages.deleteAll()
	    }).catch(function (err) {
	        console.log('## ' + err);
	    });
    });
}