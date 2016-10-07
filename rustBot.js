#!/usr/bin

global.config = require('./config.js')
global.rcon = require('webrconjs')

global.Discord = require("discord.js");
global.bot = new Discord.Client();
 
const dateFormat  = require('dateformat');

const fs = require('fs')

var bot = require('auto-loader').load(__dirname +'/bot')
var discord = require('auto-loader').load(__dirname +'/discord')
var rcon = require('auto-loader').load(__dirname +'/rcon')

bot.fsUtils.createDirectories()
bot.fsUtils.renameLogFiles()

global.rcon = new WebRcon(config.addr, config.port)

rcon.on('connect', function() {
    console.log('CONNECTED')
    
})
rcon.on('disconnect', function() {
    console.log('DISCONNECTED')
})
rcon.on('message', function(msg) {
    console.log('MESSAGE:', msg)
})
rcon.on('error', function(err) {
    console.log('ERROR:', err)
})
 
// Connect by providing the server's rcon.password: 
rcon.connect(config.pass)


rcon.connect(config.pass)
