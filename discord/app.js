

global.config = require('./../config.js')


const redis = require("redis")
const bluebird = require("bluebird")

global.client = redis.createClient()

global.clientBlocking = client.duplicate()

const Discord = require("discord.js")

global.bot = new Discord.Client()
global.moment = require('moment')

global.log = require('./../log/log.js').log
global.err = require('./../log/log.js').err

const pop = require('./redis.js').pop

bluebird.promisifyAll(redis.RedisClient.prototype)
bluebird.promisifyAll(redis.Multi.prototype)

const message = require('./message.js')

client.on("connect", () => {

	bot.on('ready', () => {
		pop()
	})

	bot.on('message', (msg) => {
		message.type(msg)
	})

	bot.on('disconnect', () => {
	    process.exit(2)
	})

	bot.login(config.discord.api)
	.then(log('connected'))
	.catch()
})


/*
		client.rpushAsync("discordMessage", JSON.stringify(msg))
		.then( () => {

		})
		.catch( err => {
			console.log(err)
		})
*/