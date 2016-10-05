// arrayType.js


// base.log('### IAF ###\n' + aline[0].SteamID, 'lc', 'rustbot.log', 'bot')

const base = require("./../lib/base");
const config = require('./../config.js');


exports.arrayTypeIF = function(a){
	// console.log(a)
	if (a[0]){
		if (a[0].SteamID) {playerList(a)}
		else {base.log('### NFA ###\n' + a, 'lc')}
	}
	// base.log('### IAF ###\n' + a[0], 'lc', 'rustbot.log', 'bot')
}


playerList = function(a){
	console.log(a)
	playersOnline = '[**' + a.length + '**][***lp***]'
	finalMessage = ''
	for(var i in a) {
		finalMessage = finalMessage + '\n[__' + a[i].DisplayName + '__ : ' + a[i].SteamID + ']'
	}
	base.log(playersOnline + finalMessage, 'lcd', 'rustbot.log', config.discordRooms.rcon)
}