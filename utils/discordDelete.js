// discordDelete.js

const Discord = require("discord.js");
const bot = new Discord.Client();





function discordMessage(line){
	chanAr = bot.channels.array()

	pChannels = ['bot']
	


	
	// channel = bot.channels.get(chanAr[2].id)

	for (var i in pChannels) {
		function findChannel(channel) { 
		    return channel.name === pChannels[i];
		}
		channel = bot.channels.get(chanAr.find(findChannel).id)
		bot.channels.get(chanAr.find(findChannel).id).sendMessage(line);
		channel.fetchMessages({limit: 100}).then(function (messages) {
            // console.log(messages)
            channel.bulkDelete(messages)
        }).catch(function (err) {
            console.log('## ' + err);
        });
    }

}




bot.on('ready', () => {
  console.log('I am ready!')
  discordMessage('ready')
});

// bot.channels.get(bot.channels.first().id).sendMessage('working outside of ready')
bot.login('MjI4OTIzOTUwMzM4NDA4NDQ4.CsbzrA.ODQkRY5ItAIGKnb-iItnAX2BMHE')
