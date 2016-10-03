// discordRcon.js

const config = require('./../config.js')

//Base Libraries - things that are called from everwhere
const base = require('./base');


/*
base.log(message.author.username + ': ' + message, 'lcd', 'chat.log', 'test')
 
base.log(message.author.username + ': ' + message, 'c', 'rcon.log', message.channel)

*/



exports.discordRcon = function (message) {
	if(message.author.id == config.discordID) {return;}
	switch (message.channel.name) {
		case ('chat'):
			base.log(message.author.username + ': ' + message, 'lcr', 'rcon.log', 'bot')
			deleteMessage(message)
			return;
		case ('rcon'):
			rconCommands(message)
			// deleteMessage(message)
			return;
		case ('test'):
			// base.log(message.author.username + ': ' + message, 'lcdr', 'chat.log', 'test')
			// base.sendRconCommand(message)
			// rcon.Command('say ' + message)
			deleteMessage(message)
			return;
		case ('general'):
			deleteMessage(message)
			return;
		default:
			deleteMessage(message)
	}

	// console.log(line.channel.name)
}

deleteMessage = function(message) {
	message.delete()
		.then(msg => base.log(`${msg} by ${msg.author.username} deleted from ${msg.channel.name}`, 'lc', 'discord.log'))
		.catch(base.log('Delete message failed'), 'lc', 'discord.log');
}

rconCommands = function(command) {
    // let messageCommand = command.content.substr(0, command.content.indexOf(" "));
    // let messageArgs = command.content.substr(command.content.indexOf(" ") + 1);
    messageCommand = new RegExp(/^(\S*)/).exec(command)[1]
    messageArgsRE = new RegExp(/^(\S*) (.*)$/) //.exec(command)[2]
    messageArgs = ''
    if(mA = messageArgsRE.exec(command)) {messageArgs = mA[2]}
 
    help = function(a) {
    	h = '[**HELP**]'
    	for (var i in a) {
    		if (a[i].scmd) {h = h + '[ __' + a[i].cmd + '__ : *' + a[i].help + '* : **' + a[i].scmd + '**]'}
    		else if (a[i].help) {h = h + '[ __' + a[i].cmd + '__ : *' + a[i].help + '* ]'}
    		// console.log(h)
    	}
    	return h;
    }

	var availCommands = [
		{'cmd' : 'help' , 'rcon' : null, 'discord' : 'test', 'help' : 'This message'},
		// {'cmd' : 'say' , 'scmd' : 's' , 'rcon' : 'say ' + messageArgs, 'help' : 'say something in chat'},
		{'cmd' : 'find' , 'rcon' : 'find ' + messageArgs},
		{'cmd' : 'listplayers' , 'scmd' : 'lp', 'rcon' : 'global.playerlist', 'help' : 'list all players'},
		{'cmd' : 'fps' , 'scmd' : 'f', 'help' : 'show fps' , 'rcon' : 'server.fps'}
	]

	helpMessage = help(availCommands)

	availCommands[0].discord = helpMessage

	function findCommand(f) { 
        return (f.cmd === messageCommand || f.scmd === messageCommand);
    }
    if (availCommands.find(findCommand)) {
    	if (availCommands.find(findCommand).rcon){rcon.Command(availCommands.find(findCommand).rcon)}
    	if (availCommands.find(findCommand).discord){base.log(availCommands.find(findCommand).discord, 'd', null , 'rcon' )}
    	deleteMessage(command)
    }
    else {deleteMessage(command)};


}


