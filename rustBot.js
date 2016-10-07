#!/usr/bin

global.config = require('./config.js')

global.WebRcon = require('webrconjs')
global.Discord = require("discord.js");
global.dateFormat  = require('dateformat');

global.bot = new Discord.Client();
global.rcon = new WebRcon(config.addr, config.port)



const fs = require('fs')

global.rustBot = require('auto-loader').load(__dirname +'/rustBot')
global.discord = require('auto-loader').load(__dirname +'/discord')
global.rust = require('auto-loader').load(__dirname +'/rust')

rustBot.fsUtils.createDirectories()
rustBot.fsUtils.renameLogFiles()

rcon.on('connect', () => {
    console.log('CONNECTED RCON')
	bot.on('ready', () => {
		console.log('CONNECTED DISCORD')
		rcon.run('say test', 1000)
	})
	rcon.on('message', (msg) => {
    	rustBot.rconMessage.rconMessageGate(msg)
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
