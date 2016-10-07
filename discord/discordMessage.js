// discordMessage.js

exports.discordMessageGate = function(msg) {
	if(msg.author.id == config.discordID) {return;}
	switch (msg.channel.name) {
		case (config.discordRooms.general):
			return;
		case (config.discordRooms.chat):
			return;
		case (config.discordRooms.rcon):
			return;
		case (config.discordRooms.log):
			return;
		case (config.discordRooms.bot):
			return;
		default:
	}
}

discordMessage = function(msg, pChannel){ 
    let datetime = dateFormat(new Date(), "[mm-dd-yy hh:MM:ss] ")
    let time = dateFormat(new Date(), '[HH:MM:ss] ')

    channel = bot.channels.find('name', pChannel)
    switch (pChannel){
    	case (config.discordRooms.log):
    		channel.sendMessage(datetime + msg)
    		break;
    	case (config.discordRooms.bot):
    		channel.sendMessage(datetime + msg)
    		break;
    	default:
    		channel.sendMessage(time + msg)
    }
}