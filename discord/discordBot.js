// discordBot.js

exports.discordBotGate = function(msg) {

	return new Promise(function (resolve, reject) {
		msg.content = msg.content.trim()
		let msgArray = RegExp(/(^\S+)\s?(.*?)?\s?(\S*)?$/).exec(msg.content)
		let cmd = msgArray[1]
		let commandArray = discord.discordResponders.botChannelCommands.find(findCommand.bind(this, cmd))
		console.log(msgArray)
		msgArrayFix(msgArray)
		console.log(msgArray)

		// if(commandArray) {
		// 	if(commandArray.dcmd) {
		// 		botCommandSwitch(msgArray, commandArray)
		// 	} else if (commandArray.cmd === 'help') {
		// 		botCommandHelp()
		// 	} else {log(msg.author.username + ' tried command \"' + cmd + '\" but it is not setup correctly as an bot command', 'l', logFile.discord, null)}
		// } else {
		// 	log(msg.author.username + ' tried command \"' + cmd + '\" it was not found', 'l', logFile.discord, null)
		// }
		resolve(msg)
    })
}

msgArrayFix = function(ma) {
	if (ma[2]) {
		console.log(ma[2].length)
	}
	// console.log(ca.length)
	// switch(ca.length)
}

findCommand = function(cmd, f) { 
    return (f.cmd === cmd)
}

botCommandSwitch = function(ma, ca) {
	console.log(ca)
	switch(ca.cmd) {
		case('clear'):
			console.logm(a)
			break;
		default:
			console.log('something went wrong')
			break;
	}

}

botCommandHelp = function() {

}
/*
botCommands = function(command){
    messageCommand = new RegExp(/^(\S*)/).exec(command)[1]
    messageArgsRE = new RegExp(/^(\S*) (.*)$/) //.exec(command)[2]
    messageArgs = ''
    if(mA = messageArgsRE.exec(command)) {messageArgs = mA[2]}
    if (a = cA.botCommands.find(findCommand)) {
        switch (cA.botCommands.find(findCommand).fcmd) {
            case ('discordDeleteAllMessages()'):
                switch (messageArgs){
                    case(config.discordRooms.rcon):
                        discordDeleteAllMessages(config.discordRooms.rcon)
                        break;
                    // case(config.discordRooms.chat):
                    //  base.discordDeleteAllMessages(config.discordRooms.chat)
                    //  break;
                    case(config.discordRooms.bot):
                        discordDeleteAllMessages(config.discordRooms.bot)
                        break;
                    case(config.discordRooms.default):
                        discordDeleteAllMessages(config.discordRooms.default)
                        break;
                    case(config.discordRooms.log):
                        discordDeleteAllMessages(config.discordRooms.log)
                        break;
                    default:
                        base.log('Channel outside context of current bot', 'lcd', logFile.discord, config.discordRooms.bot)
                        break;
                }
                // base.log('discordDeleteMessage()', 'lcd', 'rustbot.log', config.discordRooms.rcon)
                break;
            case ('discordDeleteMessageType()'):
                switch (messageArgs){
                    case('r'):
                        // console.log('not broken')
                        let RE = new RegExp(/^.+ RCON /)
                        discordDeleteMessageType(config.discordRooms.bot, RE)
                        break;
                    case('lp'):
                        let plRE = new RegExp(/^.+ \[\*\*\d+\*\*\]\[\*\*\*lp\*\*\*\]/)
                        discordDeleteMessageType(config.discordRooms.rcon, plRE)
                        break;
                    default:
                        // base.log('why you do that?', 'lcd', 'rustbot.log', config.discordRooms.bot)
                        break;
                }
                break;
            case undefined:
                break;
            default:
                break;
        }
    }
    // cA.botCommands
    
}

*/