// discordRcon.js



exports.discordRconGate = function(msg) {
	return new Promise(function (resolve, reject) {
		let msgArray = RegExp(/(^\S+)\s?(.*?)?\s?(\S*)?$/).exec(msg.content)
		let cmd = msgArray[1]
		let commandArray = discord.discordResponders.rconChannelCommands.find(findCommand.bind(this, cmd))
		if(commandArray) {


		} else {
			log(msg.author.username + ' tried command \"' + cmd + '\" it was not found', 'l', logFile.discord, null)
		}
		resolve()
    })
}


findCommand = function(cmd, f) { 
    return (f.cmd === cmd || f.scmd === cmd)
}

