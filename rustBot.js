#!/usr/bin

global.config = require('./config.js')

//Base Libraries - things that are called from everwhere
global.base = require('./lib/base');
const dR = require('./lib/discordRcon')

//discord bot load and initialize
global.Discord = require("discord.js");
global.bot = new Discord.Client();
//filesystem manipulation
global.fs = require('fs');
// dateFormat to format dates (der)
global.dateFormat  = require("dateformat");

global.clientDataCon = require("./matchers/clientData");
global.deathMessageCon = require("./matchers/deathMessage");
global.chatCon = require("./matchers/chat");
global.serverMessageCon = require("./matchers/serverMessage");
global.arrayTypeCon = require("./matchers/arrayType");
global.fpsCon = require("./matchers/fps");



discordMessage = function(msg, pChannel){ 
    let date = dateFormat(new Date(), "[mm-dd-yy hh:MM:ss] ")
    let time = dateFormat(new Date(), '[HH:MM:ss] ')
    // chanAr = bot.channels.array() 
    // if ( pChannel == null ){pChannel = config.discordRooms.bot}; 
    // function findChannel(channel) { 
    //     return channel.name === pChannel;
    // }
    channel = bot.channels.find('name', pChannel)
    switch (pChannel){
    	case (config.discordRooms.bot):
    		channel.sendMessage(date + msg)
    		return
    	default:
    		channel.sendMessage(time + msg)
    }
}

//##################################################//
//					THE Code						//
//##################################################//

for (let i in config.reDir) {
	try {
	    let stats = fs.lstatSync('.\/' + config.reDir[i])
	    if (stats.isDirectory()) {}
	} catch (e) { fs.mkdirSync('.\/' + config.reDir[i]) }
}


for (var i = 0, len = config.logFiles.length; i < len; i++) {
	try {
	    let stats = fs.lstatSync(config.logFileLocation + config.logFiles[i] + '.log')
	    if (stats.isFile()) {
	    	let fileDate = dateFormat(new Date(), "yyyymmdd_hhMMss")
	    	fs.rename(config.logFileLocation + config.logFiles[i] + '.log',config.logFileLocation +  fileDate + '_' + config.logFiles[i] + '.log')
	    }
	} catch (e) {}
}

bot.on('ready', () => {

	function iffer(line) {
		aline = null
		if (line){
		    try{
		        aline = JSON.parse(line)
		        // base.log('### TIA ###\n' + aline, 'lc', 'rustbot.log', 'bot');
		    }catch(e){
		        // base.log('### NTA ###\n' + line, 'lc', 'rustbot.log', 'bot')
		        
		    }
		}


		// test = JSON.parse(line)
		// base.log(aline, 'lc')

		if (Array.isArray(aline)){arrayTypeCon.arrayTypeIF(aline);}
		else if (clientDataRE.test(line)) {clientDataCon.clientDataIF(line);}
		else if(deathMessageRE.test(line)) {deathMessageCon.deathMessageIF(line);}
		else if(chatRE.test(line)) {chatCon.chatIF(line);}
		else if(serverMessageRE.test(line)) {serverMessageCon.serverMessageIF(line);}
		else if(serverArrayRE.test(line)) {serverMessageCon.serverArrayIF(line);}
		else if(fpsRE.test(line)) {fpsCon.fpsIF(line);}
		else  {base.log('### NF ###\n' + line, 'lc', 'rustbot.log', config.discordRooms.bot)}
	}
	
	bot.on("message", msg => {
		dR.discordRcon(msg)
	});

	rcon = new base.RconService(config);
	rcon.defaultListener = function(msg) {iffer(msg)};
	rcon.Connect();

});




// rcon = new base.RconService(rconData);
// rcon.defaultListener = function(msg) {iffer(msg)};
// rcon.Connect();

if(config.discordEnabled == 1) {
	bot.login(config.discordAPI)
}