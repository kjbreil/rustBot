// discordDelete.js

const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require('./../config.js');




function discordMessage(line){
	chanAr = bot.channels.array()

	pChannels = ['chat']
	


	
	// channel = bot.channels.get(chanAr[2].id)

	// for (var i in pChannels) {
		function findChannel(channel) { 
		    return channel.name === 'rcondev';
		}
		channel = bot.channels.get(chanAr.find(findChannel).id)
		// console.log(channel)
		bot.channels.get(channel.id).sendMessage(line);
		channel.fetchMessages({limit : 100}).then(function (messages) {
            // console.log(messages)
            channel.bulkDelete(messages)
        }).catch(function (err) {
            console.log('## ' + err);
        });
    // }

}




bot.on('ready', () => {
  console.log('I am ready!')
  discordMessage('ready')
});

// bot.channels.get(bot.channels.first().id).sendMessage('working outside of ready')
bot.login(config.discordAPI)
