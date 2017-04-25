// discordMessage.js

const chat = require('./chat.js')

var exports = module.exports = {}

exports.type = function(msg) {

	// ignore messages from the bot itself, gets into a loop
	if(msg.author.id == config.discord.id) {
		return
	} else {
		// switch between channels from config, error otherwise
		switch (msg.channel.name) {
			case (config.discord.room.chat):
				chat.type(msg)
				.then( () => {
					let chatMsg = {
						message : msg.content,
						author: msg.author.username,
						timestamp : msg.createdTimestamp
					}
					client.rpushAsync('chat', JSON.stringify(chatMsg))
					.then( () => {
						del(msg)
					})
					.catch()
				})
				.catch( (cmd) => {
					if(cmd === '.deleteAll') {delAll(config.discord.room.chat)}
				})
				break;
			case (config.discord.room.status):
				console.log('status')
				break;
			case (config.discord.room.stats):
				console.log('stats')
				break;
			case (config.discord.room.players):
				console.log('players')
				break;
			default:
				err('no such channel exists')
		}		
	}
}

// snd(msg.content, config.discord.room.chat)

exports.snd = function(msg, channel) { 
	let datetime = moment().format("[[]MM-DD-YY hh:mm:ss[]] ")
    let chnl = bot.channels.find('name', channel)
    console.log
    chnl.sendMessage(datetime + msg)
    .then()
    .catch(err)
}

let del = function(msg) {
    setTimeout(function () {
        msg.delete()
        .then()
        .catch(err)
    }, 500)
}

let delAll = function(channel) {
    let chnl = bot.channels.find('name', channel)
    chnl.fetchMessages({limit : 100})
    .then(function (m) {
        chnl.bulkDelete(m)
    })
    .catch(err)
}