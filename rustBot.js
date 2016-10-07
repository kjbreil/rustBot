#!/usr/bin

global.config = require('./config.js')

global.WebRcon = require('webrconjs')
global.Discord = require("discord.js");

global.bot = new Discord.Client();
global.rcon = new WebRcon(config.addr, config.port)

const dateFormat  = require('dateformat');

const fs = require('fs')

var rustBot = require('auto-loader').load(__dirname +'/rustBot')
var discord = require('auto-loader').load(__dirname +'/discord')
var rust = require('auto-loader').load(__dirname +'/rust')

rustBot.fsUtils.createDirectories()
rustBot.fsUtils.renameLogFiles()

rcon.on('connect', () => {
    console.log('CONNECTED RCON')

	bot.on('ready', () => {
		console.log('CONNECTED DISCORD')
	})

	bot.login(config.discordAPI)
})
rcon.on('disconnect', () => {
    console.log('DISCONNECTED')
})
rcon.on('message', (msg) => {
    console.log('MESSAGE:', msg)
})
rcon.on('error', (err) => {
    console.log('ERROR:', err)
})
 

rcon.connect(config.pass)
