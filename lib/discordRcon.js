// discordRcon.js

const itemSets = require('./itemSets.js')

exports.discordRcon = function (message) {
	if(message.author.id == config.discordID) {return;}
	switch (message.channel.name) {
		case (config.discordRooms.bot):
			deleteMessage(message)
			return;
		case (config.discordRooms.chat):
			base.log(message.author.username + ': ' + message.content, 'lcr', 'rcon.log', config.discordRooms.bot)
			deleteMessage(message)
			return;
		case (config.discordRooms.rcon):
			rconCommands(message)
			return;
		case (config.discordRooms.general):
			deleteMessage(message)
			return;
		default:
			// deleteMessage(message)
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
    		if (a[i].scmd) {h = h + '[ __' + a[i].cmd + '__ : *' + a[i].help + '* : ***' + a[i].scmd + '***]'}
    		else if (a[i].help) {h = h + '[ __' + a[i].cmd + '__ : *' + a[i].help + '* ]'}
    		// console.log(h)
    	}
    	return h;
    }

	var availCommands = [
		{cmd : 'help' , rcon : null, discord : 'test', help : 'This message'},
		{cmd : 'say' , scmd : 's' , 'rcon' : 'say ' + messageArgs, help : 'say something in chat'},
		{cmd : 'find' , rcon : 'find ' + messageArgs},
		{cmd : 'listplayers' , scmd : 'lp', rcon : 'global.playerlist', help : 'list all players'},
		{cmd : 'fps' , scmd : 'f', help : 'show fps' , rcon : 'server.fps'},
		{cmd : 'delete', fcmd : 'discordDeleteAllMessages()'},
		{cmd : 'dm', fcmd : 'discordDeleteMessageType()'},
        {cmd : 'give', fcmd : 'serverGive()'}
	]

	helpMessage = help(availCommands)

	availCommands[0].discord = helpMessage


    if (availCommands.find(findCommand)) {
    	if (availCommands.find(findCommand).rcon){rcon.Command(availCommands.find(findCommand).rcon)}
    	if (availCommands.find(findCommand).discord){base.log(availCommands.find(findCommand).discord, 'd', null , config.discordRooms.rcon)}
    	switch (availCommands.find(findCommand).fcmd) {
    		case ('discordDeleteAllMessages()'):
    			switch (messageArgs){
    				case(config.discordRooms.rcon):
    					base.discordDeleteAllMessages(config.discordRooms.rcon)
    					break;
    				// case(config.discordRooms.chat):
    				// 	base.discordDeleteAllMessages(config.discordRooms.chat)
    				// 	break;
    				case(config.discordRooms.bot):
    					base.discordDeleteAllMessages(config.discordRooms.bot)
    					break;
    				case(config.discordRooms.default):
    					base.discordDeleteAllMessages(config.discordRooms.default)
    					break;
    				default:
    					base.log('Channel outside context of current bot', 'lcd', 'rustbot.log', config.discordRooms.rcon)
    					break;
    			}
    			// base.log('discordDeleteMessage()', 'lcd', 'rustbot.log', config.discordRooms.rcon)
    			break;
    		case ('discordDeleteMessageType()'):
    			switch (messageArgs){
    				case('t'):
    					base.discordDeleteMessageType(config.discordRooms.rcon, 'fps')
    					break;
    				default:
    					base.log('why you do that?', 'lcd', 'rustbot.log', config.discordRooms.rcon)
    					break;
    			}
                break;
            case ('serverGive()'):
                giveCommand(messageArgs)
    			break;
    		case undefined:
	    		break;
	    	default:
	    		break;
    	}
    	deleteMessage(command)
    }
    else {deleteMessage(command)};


}

botCommands = function(command){
    messageCommand = new RegExp(/^(\S*)/).exec(command)[1]
    messageArgsRE = new RegExp(/^(\S*) (.*)$/) //.exec(command)[2]
    messageArgs = ''
    if(mA = messageArgsRE.exec(command)) {messageArgs = mA[2]}
	var availCommands = [
		{cmd : 'delete', fcmd : 'discordDeleteAllMessages()'},
		{cmd : 'dm', fcmd : 'discordDeleteMessageType()'}
	]


}

findCommand = function(f) { 
    messageCommand = messageCommand.toLowerCase()
    return (f.cmd === messageCommand || f.scmd === messageCommand);
}


serverGive = function(items) {
    base.log('Starting the Give', 'lc' )
    for (let i in items){
        rcon.Command('giveall ' + items[i].item + ' ' + items[i].qty)
    }
}

giveHelp = function() {
    h = '[**HELP**]'
    h = h + '\n[ __kit__ : *armor, ammo, gun* : **1, 100, 1** ]'
    h = h + '\n[ __c4__ : *timed explosives* : ***5*** ]'
    // for (var i in a) {
    //     if (a[i].scmd) {h = h + '[ __' + a[i].cmd + '__ : *' + a[i].help + '* : ***' + a[i].scmd + '***]'}
    //     else if (a[i].help) {h = h + '[ __' + a[i].cmd + '__ : *' + a[i].help + '* ]'}
    // }
    base.log(h, 'd', null, config.discordRooms.rcon)
    return;
}

giveCommand = function(m) {
    switch (m){
        case('help'):
            giveHelp()
            break;
        case('kit'):
            serverGive(itemSets.armor)
            break;
        case('c4'):
            serverGive(itemSets.c4)
            break;
        default:
            base.log(m + ' is not a found give set', 'lcd', 'rustbot.log', config.discordRooms.rcon)
            break;
    }
}