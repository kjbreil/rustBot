// clientData.js

// Client data is not implemented yet but will be logon, disconnect messages

const base = require("./../lib/base");
const config = require('./../config.js');

clientDataRE  = new RegExp(/^(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\:\d{1,6})\/(\d+?)\/(.+)/);

exports.clientDataIF = function (line) {
	base.log(line, 'lcd', 'connect.log', config.discordRooms.log);
}
