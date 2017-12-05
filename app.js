#!/usr/bin

global.config = require('./config.js')

global.WebRcon = require('webrconjs')
global.Discord = require('discord.js')
global.dateFormat = require('dateformat')
global.knex = require('knex')(config.knex)

global.bot = new Discord.Client()
global.rcon = new WebRcon(config.addr, config.port)

const path = require('path')

global.playersOnline = []

global.Promise = require('bluebird')

global.cpu = require('auto-loader').load(path.join(__dirname, '/cpu'))
global.discord = require('auto-loader').load(path.join(__dirname, '/discord'))
global.rust = require('auto-loader').load(path.join(__dirname, '/rust'))

global.log = cpu.logger.rustBotLog
global.logFile = config.logFiles[0]
global.discordRoom = config.discordRooms[0]

global.server = {}
server.refresh = {}

cpu.fsUtils.createDirectories()
cpu.fsUtils.renameLogFiles()

rcon.on('connect', () => {
  log('CONNECTED: RCON', 'lc', logFile.info, discordRoom.bot)
  bot.on('ready', () => {
    log('CONNECTED: DISCORD', 'lc', logFile.info, discordRoom.bot)
    // rust.rconListPlayers.getPlayerIsOnline('76561198125564678').then(function (msg) {log(msg)}, 'lc', logFile.info, discordRoom.bot)
    // Disable scheduled and timed commands for now, no need for steam stats right now
    // cpu.scheduledCommands.runScheduledCommands()
    // cpu.timedCommands.runTimedCommands()

    rcon.on('disconnect', () => {
      log('RCON DISCONNECTED', 'lc', logFile.info, discordRoom.bot)
      bot.destroy().then(function () {
        log('DISCONNECTED: DISCORD', 'lc', logFile.info, discordRoom.bot)
        process.exit()
      }).catch(function (err) { log(err, 'lc', logFile.info, discordRoom.bot) })
    })

    process.on('SIGUSR2', () => {
      log('SIGUSR2: DISCONNECTING: DISCORD, RCON', 'lc', logFile.info, discordRoom.bot)
      bot.destroy().then(function () {
        log('DISCONNECTED: DISCORD', 'lc', logFile.info, discordRoom.bot)
        rcon.disconnect()
        log('DISCONNECTED: RCON', 'lc', logFile.info, discordRoom.bot)
        process.exit(1)
      }).catch(function (err) {
        log(err, 'lc', logFile.info, discordRoom.bot)
      }).catch(function (err) { log(err, 'lc', logFile.info, discordRoom.bot) })
    })
  })
  rcon.on('message', (msg) => {
    // log('RCON MESSAGE', 'lc', logFile.info, discordRoom.bot)
    rust.rconMessage.rconMessageGate(msg)
  })
  bot.on('message', (msg) => {
  // log(msg, 'lc', logFile.info, discordRoom.bot)
    discord.discordMessage.discordMessageGate(msg)
  })

  bot.on('disconnect', () => {
    log('DISCONNECTED: DISCORD CONNECTION LOST', 'lc', logFile.info, discordRoom.bot)
    rcon.disconnect()
    log('DISCONNECTED: RCON', 'lc', logFile.info, discordRoom.bot)
    process.exit(2)
  })

  bot.on('error', (err) => {
    log('ERROR in DISCORD BOT' + err, 'lc', logFile.info, discordRoom.bot)
  })

  bot.login(config.discordAPI)
})

rcon.on('error', (err) => {
  log('ERROR:' + err, 'lc', logFile.info, discordRoom.bot)
  process.exit(2)
})

// remove db stuff for the time being
// cpu.sql.sqlCreateTables.sqlCreateTablesGate()
rcon.connect(config.pass)
