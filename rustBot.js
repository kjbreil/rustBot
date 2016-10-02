#!/usr/bin

//##################################################//
//					THE Constructs					//
//##################################################//
const config = require('./config.js')

//Base Libraries - things that are called from everwhere
const base = require('./lib/base');
//discord bot load and initialize
const Discord = require("discord.js");
const bot = new Discord.Client();
//filesystem manipulation
const fs = require('fs');

const clientDataCon = require("./matchers/clientData");
const deathMessageCon = require("./matchers/deathMessage");
const chatCon = require("./matchers/chat");


//##################################################//
//					THE Variables					//
//##################################################//

var inputlogfile = "./exLog/merged.log";

// Rust log file date format (why am i keeping this???)
var date = new Date().toISOString()
                        .replace(/T/, ' ')
                        .replace(/\..+/, '');
//set the variables for filedates 
var rightnow = new Date(),
	year = rightnow.getFullYear(),
	month = rightnow.getMonth(),
	day = rightnow.getDay()
	hour = rightnow.getHours()
	minute = rightnow.getMinutes()
	seconds = rightnow.getSeconds();
// fileDate format - YYYYMMDD_HHMM
var fileDate = String(year) + String(month) + String(day) + '_' + String(hour) + String(minute);

reDir = ['logs','exLog','lib','matchers']

logFiles = ['rustbot','chat']

discordEnabled = 1
rconEnabled = 1

//something

//##################################################//
//					THE Code						//
//##################################################//

// Make sure all the directories exist
for (var i = 0, len = reDir.length; i < len; i++) {
	if (!fs.existsSync('.\/' + reDir[i])){
		fs.mkdirSync('.\/' + reDir[i]);
	}
}


//Rename the old log file - fuck this for right now, will be implemented when live
fs.rename('logs/rustbot.log', 'logs/' + fileDate + '_rustbot.log');
fs.writeFile('logs/rustbot.log','['+date+'] ' + 'RCON SCRIPT STARTED' + '\n');
fs.rename('logs/chat.log', 'logs/' + fileDate + '_chat.log');
fs.writeFile('logs/chat.log','['+date+'] ' + 'RCON SCRIPT STARTED' + '\n');

//initialize linereader - this is a copy/paste and should figure out how to do with const



// TODO: Make array from list of files in matchers with js extension
// use list in for statement to create if statement below keeping this at a couple lines
// NOTE: ATM Regex not working with switch statements has to be if statements
// Also does not look promising on the array, fuck

// lineReader.on('line', function (line) {
//   if(clientDataRE.test(line)) {clientDataCon.clientDataIF(line);}
//   if(deathMessageRE.test(line)) {deathMessageCon.deathMessageIF(line);}
// });

discordMessage = function(msg){
    bot.channels.get(bot.channels.first().id).sendMessage(msg);
}

bot.on('ready', () => {
	console.log('starting')
	discordMessage('BOT CONNECTED')
	function iffer(line) {
		if(clientDataRE.test(line)) {clientDataCon.clientDataIF(line);}
		if(deathMessageRE.test(line)) {deathMessageCon.deathMessageIF(line);}
		if(chatRE.test(line)) {chatCon.chatIF(line);}
	}

	rcon = new base.RconService(config);
	rcon.defaultListener = function(msg) {iffer(msg)};
	rcon.Connect();

});


// rcon = new base.RconService(rconData);
// rcon.defaultListener = function(msg) {iffer(msg)};
// rcon.Connect();

if(discordEnabled == 1) {bot.login(config.discordAPI)}