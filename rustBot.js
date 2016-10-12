#!/usr/bin

global.config = require('./config.js')

global.WebRcon = require('webrconjs')
global.Discord = require("discord.js");
global.dateFormat  = require('dateformat');
global.knex = require('knex')(config.knex)

global.bot = new Discord.Client();
global.rcon = new WebRcon(config.addr, config.port)

global.playersOnline = []

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
		// rust.rconListPlayers.getPlayerIsOnline('76561198125564678').then(function (msg) {console.log(msg)})
		setTimeout(function(){
			rust.rconListPlayers.getAndDisplayPlayers()
			// cpu.sql.sqlInserters.sqlInsertersGate('Rygus[159208/76561198125564678] was killed by hellsboy[44256/76561198030172959]', 'death')
		}, 1000)
		cpu.scheduledCommands.runScheduledCommands()

		rcon.on('disconnect', () => {
		    console.log('RCON DISCONNECTED')
		    bot.destroy().then(function() {
				console.log('DISCONNECTED: DISCORD')
				process.exit()
			})
		})

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
		// console.log(msg)
		discord.discordMessage.discordMessageGate(msg)
	})

	bot.on('disconnect', () => {
	    console.log('DISCONNECTED: DISCORD CONNECTION LOST')
	    rcon.disconnect()
	    console.log('DISCONNECTED: RCON')
	    process.exit(2)
	});

	bot.login(config.discordAPI)
})

rcon.on('error', (err) => {
    console.log('ERROR:', err)
    process.exit(2)
})
 
cpu.sql.sqlCreateTables.sqlCreateTablesGate()
rcon.connect(config.pass)
