#!/usr/bin

global.config = require('./config.js')
global.rcon = require('webrconjs')
global.dateFormat  = require('dateformat');

const fs = require('fs')

var bot = require('auto-loader').load(__dirname +'/bot')
var discord = require('auto-loader').load(__dirname +'/discord')
var rcon = require('auto-loader').load(__dirname +'/rcon')
// console.log(bot)

bot.fsUtils.createDirectories()
bot.fsUtils.renameLogFiles()



// // Once discord connects start the magic
// bot.on('ready', () => {
// 	base.log('Discord Connected', 'lc', 'rustbot.log')
// 	let iffer = function(line) {
// 		aline = null
// 		if (line){try{aline = JSON.parse(line)}catch(e) {}}
// 		if (Array.isArray(aline)){arrayTypeCon.arrayTypeIF(aline);}
// 		else if (clientDataRE.test(line)) {clientDataCon.clientDataIF(line);}
// 		else if(deathMessageRE.test(line)) {deathMessageCon.deathMessageIF(line);}
// 		else if(chatRE.test(line)) {chatCon.chatIF(line);}
// 		else if(serverMessageRE.test(line)) {serverMessageCon.serverMessageIF(line);}
// 		else if(serverArrayRE.test(line)) {serverMessageCon.serverArrayIF(line);}
// 		else if(fpsRE.test(line)) {fpsCon.fpsIF(line);}
// 		else  {base.log('### NF ###\n' + line, 'lc', 'rustbot.log', config.discordRooms.bot)}
// 	}
// 	// On discord message run discord function
// 	bot.on("message", msg => {
// 		dR.discordRcon(msg)
// 	})
// 	// Connect to RCON - need to edit for enabled/disabled config option
// 	rcon = new base.RconService(config)
// 	rcon.defaultListener = function(msg) {iffer(msg)}
// 	rcon.Connect()

// 	schCmds.startSchCmds()

// })
// // If discord is enabled then connect to discord, if its not enabled nothing will happen ATM
// if(config.discordEnabled == 1) {
// 	base.log('Discord Connecting', 'lc', 'rustbot.log')
// 	bot.login(config.discordAPI)
// }