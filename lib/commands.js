// commands.js

const discordRcon = require('./discordRcon.js')

exports.rconCommands = [
	{cmd : 'help' , rcon : null, discord : 'test', help : 'This message'},
	// {cmd : 'say' , scmd : 's' , 'rcon' : 'say ' + discordRcon.messageArgs, help : 'say something in chat'},
	{cmd : 'find' , rcon : 'find ' + discordRcon.messageArgs},
	{cmd : 'listplayers' , scmd : 'lp', rcon : 'global.playerlist', help : 'list all players'},
	{cmd : 'fps' , scmd : 'f', help : 'show fps' , rcon : 'server.fps', cb : 'fpsCon.fpsIF'},
    {cmd : 'give', rcon : 'giveCommand()', help : 'Give kits to all players, \"give help\" for more info'}
]

exports.botCommands = [
	{cmd : 'clear', fcmd : 'discordDeleteAllMessages()'},
	{cmd : 'dm', fcmd : 'discordDeleteMessageType()'}
]