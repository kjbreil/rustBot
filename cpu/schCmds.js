// schCmds.js


let playerListSCH = setInterval(function () { 
    rcon.Command('global.playerlist', 'displayPlayers.discordDisplayPlayers'); 
}, 600000); 

exports.startSchCmds = function() {
	playerListSCH
}