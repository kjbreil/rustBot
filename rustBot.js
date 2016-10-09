#!/usr/bin

global.config = require('./config.js')

global.WebRcon = require('webrconjs')
global.Discord = require("discord.js");
global.dateFormat  = require('dateformat');

global.bot = new Discord.Client();
global.rcon = new WebRcon(config.addr, config.port)

const fs = require('fs')


global.cpu = require('auto-loader').load(__dirname +'/cpu')
global.discord = require('auto-loader').load(__dirname +'/discord')
global.rust = require('auto-loader').load(__dirname +'/rust')

global.log = cpu.logger.rustBotLog
global.logFile = config.logFiles[0]
global.discordRoom = config.discordRooms[0]



cpu.fsUtils.createDirectories()
cpu.fsUtils.renameLogFiles()


rcon.on('connect', () => {
    console.log('CONNECTED: RCON')
	bot.on('ready', () => {
		console.log('CONNECTED: DISCORD')
		setTimeout(function(){
			rust.rconListPlayers.getAndDisplayPlayers()
		}, 5000)
		process.on('SIGUSR2', () => {
			console.log('SIGUSR2: DISCONNECTING: DISCORD, RCON')
			bot.destroy().then(function() {
				console.log('DISCONNECTED: DISCORD')
				rcon.disconnect()
				console.log('DISCONNECTED: RCON')
				process.exit(1)
			}).catch(function (err) {
		        console.log(err)
		    })
		})
	})
	rcon.on('message', (msg) => {
		// console.log('RCON MESSAGE')
    	rust.rconMessage.rconMessageGate(msg)
	})
	bot.on('message', (msg) => {
		// console.log('DISCORD MESSAGE')
		discord.discordMessage.discordMessageGate(msg)
	})
	rcon.on('disconnect', () => {
	    console.log('RCON DISCONNECTED')
	    process.exit()
	})
	bot.on('disconnect', () => {
	    console.log('DISCONNECTED: DISCORD CONNECTION LOST')
	    process.exit(2)
	});

	bot.login(config.discordAPI)
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