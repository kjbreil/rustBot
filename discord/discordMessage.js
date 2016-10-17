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
                log(err, 'lc', logFile.info, discordRoom.bot)
		    })
			break;
		case (discordRoom.log):
			discordDeleteMessage(msg)
			break;
		case (discordRoom.bot):
            discord.discordBot.discordBotGate(msg).then(function(m){
                discordDeleteMessage(msg)
            }).catch(function (err) {
                log(err, 'lc', logFile.info, discordRoom.bot)
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
    // console.log(msg)
    switch (pChannel){
    	case (config.discordRooms.log):
    		channel.sendMessage(datetime + msg)
            channel.stopTyping(true)
    		break;
    	case (config.discordRooms.bot):
    		channel.sendMessage(datetime + msg)
            channel.stopTyping(true)
    		break;
    	default:
    		channel.sendMessage(time + msg)
            channel.stopTyping(true)
    }
}

discordDeleteMessage = function(message) {
    console.log(message)
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
        log('## ' + err, 'lc', logFile.info, discordRoom.bot);
    });
}


exports.discordDeleteMessageType = function(pChannel, type) {
    return new Promise(function (resolve, reject) {
        // log(type + ' ' + pChannel, 'lc', logFile.info, discordRoom.bot)
        let channel = bot.channels.find('name', pChannel)
        channel.fetchMessages({limit : 100}).then(function (m) {
            // log(m, 'lc', logFile.info, discordRoom.bot)
            filteredMessages = m.filter(findMessage.bind(this, type))
            filteredMessages.deleteAll()
            resolve()
        }).catch(function (err) {
            log('### ' + err, 'lc', logFile.info, discordRoom.bot)
        })
    })
}

findMessage = function(r, f) { 
    if(r.test(f.content)) {return f}
}

// discord.discordMessage.fixedWidth(10, )
exports.fixedWidth = function(width, str, chr) {
    if(!chr){chr = ' '}
    if (typeof str === 'undefined') {
        return pad
    }
    let i = width
    let pad = ''
    while(i--) {
        pad += chr
    }
    return (str + pad).substring(0, width)
}