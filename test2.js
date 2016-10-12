
global.config = require('./config.js')

global.WebRcon = require('webrconjs')
global.Discord = require("discord.js");
global.dateFormat  = require('dateformat');
global.knex = require('knex')(config.knex)

global.bot = new Discord.Client();
global.rcon = new WebRcon(config.addr, config.port)



const fs = require('fs')


global.cpu = require('auto-loader').load(__dirname +'/cpu')
global.discord = require('auto-loader').load(__dirname +'/discord')
global.rust = require('auto-loader').load(__dirname +'/rust')

global.log = cpu.logger.rustBotLog
global.logFile = config.logFiles[0]
global.discordRoom = config.discordRooms[0]


cpu.sql.sqlInserters.deathToSql('76561198125564678')