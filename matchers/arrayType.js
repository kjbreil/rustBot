// arrayType.js


// base.log('### IAF ###\n' + aline[0].SteamID, 'lc', 'rustbot.log', 'bot')

const base = require("./../lib/base");
const config = require('./../config.js');


exports.arrayTypeIF = function(a){
	// console.log(a)
	if (a[0]){
		if (a[0].SteamID) {arrayType.playerList(a)}
		else {base.log('### NFA ###\n' + a, 'lc')}
	}
	// base.log('### IAF ###\n' + a[0], 'lc', 'rustbot.log', 'bot')
}


exports.playerList = function(a){
	playerListWait = 1
	console.log(a)
	playersOnline = '[**' + a.length + '**][***lp***][DisplayName : SteamID : Ping]'
	finalMessage = ''

	for(var i in a) {
		finalMessage = finalMessage + '\n[__' + a[i].DisplayName + '__ : ' + a[i].SteamID + ' : ' + a[i].Ping + ']'
	}

	base.log(playersOnline + finalMessage, 'lcd', 'rustbot.log', config.discordRooms.rcon)
}

exports.playerListBlank = function() {
	playersOnline = '[**0**][***lp***][DisplayName : SteamID : Ping]'
	base.log(playersOnline, 'lcd', 'rustbot.log', config.discordRooms.rcon)
}

/*

[ { SteamID: '76561198014626147',
    OwnerSteamID: '0',
    DisplayName: 'Otto the Caddy',
    Ping: 9,
    Address: '71.37.35.118:26892',
    ConnectedSeconds: 812,
    VoiationLevel: 0,
    CurrentLevel: 3,
    UnspentXp: 5,
    Health: 0 } ]

*/