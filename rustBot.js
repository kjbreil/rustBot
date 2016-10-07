#!/usr/bin

global.config = require('./config.js')

global.WebRcon = require('webrconjs')
global.Discord = require("discord.js");
global.dateFormat  = require('dateformat');

global.bot = new Discord.Client();
global.rcon = new WebRcon(config.addr, config.port)

global.fs = require('fs')


global.cpu = require('auto-loader').load(__dirname +'/cpu')
global.discord = require('auto-loader').load(__dirname +'/discord')
global.rust = require('auto-loader').load(__dirname +'/rust')

global.log = cpu.logger.rustBotLog
global.logFile = config.logFiles[0]
global.discordRoom = config.discordRooms[0]

cpu.fsUtils.createDirectories()
cpu.fsUtils.renameLogFiles()


rcon.on('connect', () => {
    console.log('CONNECTED RCON')
	bot.on('ready', () => {
		console.log('CONNECTED DISCORD')

	})
	rcon.on('message', (msg) => {

    	rust.rconMessage.rconMessageGate(msg)
	})
	bot.on('message', (msg) => {
		discord.discordMessage.discordMessageGate(msg)
	})

	bot.login(config.discordAPI)
})
rcon.on('disconnect', () => {
    console.log('DISCONNECTED')
})

rcon.on('error', (err) => {
    console.log('ERROR:', err)
})
 

rcon.connect(config.pass)

/*
rcon.run('say test', 1000).then(function(msg){
	console.log('Promise Returned')
	console.log(msg)
})
*/