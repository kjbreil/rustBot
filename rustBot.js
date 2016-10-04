#!/usr/bin

//##################################################//
//					THE Constructs					//
//##################################################//

const config = require('./config.js')

//Base Libraries - things that are called from everwhere
const base = require('./lib/base');
const dR = require('./lib/discordRcon')

//discord bot load and initialize
const Discord = require("discord.js");
bot = new Discord.Client();
//filesystem manipulation
const fs = require('fs');
// dateFormat to format dates (der)
const dateFormat  = require("dateformat");

const clientDataCon = require("./matchers/clientData");
const deathMessageCon = require("./matchers/deathMessage");
const chatCon = require("./matchers/chat");
const serverMessageCon = require("./matchers/serverMessage");
const arrayTypeCon = require("./matchers/arrayType");
const fpsCon = require("./matchers/fps");



//##################################################//
//					THE Variables					//
//##################################################//

var rightNow = new Date();
var fileDate = dateFormat(rightNow, "yyyymmdd_hhMMss");

discordEnabled = config.discordEnabled
rconEnabled = config.rconEnabled

//##################################################//
//					THE Functions					//
//##################################################//

discordMessage = function(msg, pChannel){
    var rightNow = new Date();
    var date = dateFormat(rightNow, "[mm-dd-yy hh:MM:ss] ");
    var time = dateFormat(rightNow, '[HH:MM:ss] ')
    // chanAr = bot.channels.array() 
    // if ( pChannel == null ){pChannel = config.discordRooms.bot}; 
    // function findChannel(channel) { 
    //     return channel.name === pChannel;
    // }
    channel = bot.channels.find('name', pChannel)
    switch (pChannel){
    	case (config.discordRooms.bot):
    		channel.sendMessage(date + msg);
    		return;
    	default:
    		channel.sendMessage(time + msg);

    }
    
}

//##################################################//
//					THE Code						//
//##################################################//


for (var i = 0, len = config.reDir.length; i < len; i++) {
	try {
	    stats = fs.lstatSync('.\/' + config.reDir[i]);
	    if (stats.isDirectory()) {
	    }
	}
	catch (e) {
	    fs.mkdirSync('.\/' + config.reDir[i]);
	}
}


for (var i = 0, len = config.logFiles.length; i < len; i++) {
	try {
	    stats = fs.lstatSync(config.logFileLocation + config.logFiles[i] + '.log')
	    if (stats.isFile()) {
	    	fs.rename(config.logFileLocation + config.logFiles[i] + '.log',config.logFileLocation +  fileDate + '_' + config.logFiles[i] + '.log')
	    }
	}
	catch (e) {
	    ;
	}
}

//Rename the old log file - fuck this for right now, will be implemented when live
// fs.rename('logs/rustbot.log', 'logs/' + fileDate + '_rustbot.log');
// fs.writeFile('logs/rustbot.log','['+date+'] ' + 'RCON SCRIPT STARTED' + '\n');
// fs.rename('logs/chat.log', 'logs/' + fileDate + '_chat.log');
// fs.writeFile('logs/chat.log','['+date+'] ' + 'RCON SCRIPT STARTED' + '\n');

//initialize linereader - this is a copy/paste and should figure out how to do with const



// TODO: Make array from list of files in matchers with js extension
// use list in for statement to create if statement below keeping this at a couple lines
// NOTE: ATM Regex not working with switch statements has to be if statements
// Also does not look promising on the array, fuck

// lineReader.on('line', function (line) {
//   if(clientDataRE.test(line)) {clientDataCon.clientDataIF(line);}
//   if(deathMessageRE.test(line)) {deathMessageCon.deathMessageIF(line);}
// });


		// else if(Array.isArray(line)) {
		// 	base.log('### NFA ###\n' + line, 'lc', 'rustbot.log', 'bot')
		// }

bot.on('ready', () => {
	// console.log('starting')
	// discordMessage('BOT CONNECTED')
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
		// rcon.Command('say ' + msg);
		// base.log(msg, 'lcr')
	});

	rcon = new base.RconService(config);
	rcon.defaultListener = function(msg) {iffer(msg)};
	rcon.Connect();

});




// rcon = new base.RconService(rconData);
// rcon.defaultListener = function(msg) {iffer(msg)};
// rcon.Connect();

if(discordEnabled == 1) {bot.login(config.discordAPI)}