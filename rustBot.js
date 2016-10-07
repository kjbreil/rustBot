#!/usr/bin

global.config = require('./config.js')

global.WebRcon = require('webrconjs')
global.Discord = require("discord.js");

global.bot = new Discord.Client();
global.rcon = new WebRcon(config.addr, config.port)

const dateFormat  = require('dateformat');

const fs = require('fs')

var bot = require('auto-loader').load(__dirname +'/bot')
var discord = require('auto-loader').load(__dirname +'/discord')
var rust = require('auto-loader').load(__dirname +'/rcon')

bot.fsUtils.createDirectories()
bot.fsUtils.renameLogFiles()

rcon.on('connect', () => {
    console.log('CONNECTED')

 //    global.bot = new Discord.Client();

	// bot.on('ready', () => {
	// })

	// bot.login(config.discordAPI)
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
