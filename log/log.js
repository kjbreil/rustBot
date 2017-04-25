const redis = require("redis")
const bluebird = require("bluebird")

const client = redis.createClient()

bluebird.promisifyAll(redis.RedisClient.prototype)
bluebird.promisifyAll(redis.Multi.prototype)


var exports = module.exports = {}

exports.log = function(msg) {
	console.log(msg)
}

exports.err = function(msg) {
	console.log(msg)
}
