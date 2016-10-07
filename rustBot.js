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
// console.log(bot)

bot.fsUtils.createDirectories()
bot.fsUtils.renameLogFiles()




global.rcon = new WebRcon(config.addr, config.port)

rcon.connect(config.pass)
