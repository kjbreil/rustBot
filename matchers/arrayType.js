// arrayType.js


// base.log('### IAF ###\n' + aline[0].SteamID, 'lc', 'rustbot.log', 'bot')

const base = require("./../lib/base");

exports.arrayTypeIF = function(a){
	// console.log(a)
	if (a[0].SteamID) {playerList(a)}
	else {base.log('### NFA ###\n' + a, 'lc')}

	// base.log('### IAF ###\n' + a[0], 'lc', 'rustbot.log', 'bot')
}


playerList = function(a){
	playersOnline = '[' + a.length + ']'
	for(var i in a) {
		finalMessage = '__[' + a[i].DisplayName + '__ : ' + a[i].SteamID + ']'
	}
	base.log(playersOnline + finalMessage, 'lcd', 'rustbot.log', 'rcon')
}