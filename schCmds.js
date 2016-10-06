// schCmds.js


let playerListSCH = setInterval(function () { 
    rcon.Command('global.playerlist', 'displayPlayers.discordDisplayPlayers'); 
}, 60000); 

// let playerListSCH2 = setInterval(function () { 
//     rcon.Command('global.playerlist', 'displayPlayers.discordDisplayPlayers'); 
// }, 9000); 


exports.startSchCmds = function() {
	playerListSCH
	playerListSCH2
}