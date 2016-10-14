// discordMessage.js

exports.discordMessageGate = function(msg) {
	if(msg.author.id == config.discordID) {return;}
	switch (msg.channel.name) {
		case (discordRoom.general):
			discordDeleteMessage(msg)
			break;
		case (discordRoom.chat):
			log(msg.author.username + ': ' + msg.content, 'lr', logFile.rcon, config.discordRooms.bot)
			discordDeleteMessage(msg)
			break;
		case (discordRoom.rcon):
			discord.discordRcon.discordRconGate(msg).then(function(m){
				discordDeleteMessage(msg)
			}).catch(function (err) {
                console.log(err)
		    })
			break;
		case (discordRoom.log):
			discordDeleteMessage(msg)
			break;
		case (discordRoom.bot):
            discord.discordBot.discordBotGate(msg).then(function(m){
                discordDeleteMessage(msg)
            }).catch(function (err) {
                console.log(err)
            })
			break;
		default:
	}
}

exports.discordSendMessage = function(msg, pChannel){ 
    let datetime = dateFormat(new Date(), "[mm-dd-yy hh:MM:ss] ")
    let time = dateFormat(new Date(), '[HH:MM:ss] ')
    let channel = bot.channels.find('name', pChannel)
    // channel.startTyping()
    switch (pChannel){
    	case (config.discordRooms.log):
    		channel.sendMessage(datetime + msg, split=1)
            channel.stopTyping(true)
    		break;
    	case (config.discordRooms.bot):
    		channel.sendMessage(datetime + msg, split=1)
            channel.stopTyping(true)
    		break;
    	default:
    		channel.sendMessage(time + msg, split=1)
            channel.stopTyping(true)
    }
}

discordDeleteMessage = function(message) {
    setTimeout(function () {
        message.delete()
            .then(msg => log(`${msg} by ${msg.author.username} deleted from ${msg.channel.name}`, 'l', logFile.discord, null))
            .catch(log('Delete message failed'), 'l', 'discord', null);
    }, 250);    
}

exports.discordDeleteAllMessages = function(pChannel) {
    let channel = bot.channels.find('name', pChannel)
    channel.sendMessage('Gonna delete some stuff')
    channel.fetchMessages({limit : 100}).then(function (m) {
        channel.bulkDelete(m)
    }).catch(function (err) {
        console.log('## ' + err);
    });
}


exports.discordDeleteMessageType = function(pChannel, type) {
    return new Promise(function (resolve, reject) {
        // console.log(type + ' ' + pChannel)
        let channel = bot.channels.find('name', pChannel)
        channel.fetchMessages({limit : 100}).then(function (m) {
            filteredMessages = m.filter(findMessage.bind(this, type))
            filteredMessages.deleteAll()
            resolve()
        }).catch(function (err) {
            console.log('### ' + err)
        })
    })
}

findMessage = function(r, f) { 
    if(r.test(f.content)) {return f}
}

// discord.discordMessage.fixedWidth(10, )
exports.fixedWidth = function(width, str) {
    if (typeof str === 'undefined') {
        return pad
    }
    let i = width
    let pad = ''
    while(i--) {
        pad += ' '
    }
    return (str + pad).substring(0, width)
}