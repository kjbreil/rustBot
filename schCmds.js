// schCmds.js


let playerListSCH = setInterval(function () { 
    rcon.Command('global.playerlist', 'displayPlayers.discordDisplayPlayers'); 
}, 60000); 

exports.startSchCmds = function() {
	playerListSCH
}