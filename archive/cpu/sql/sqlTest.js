// // sqlTest.js



global.config = require('./../../config.js')


let knexClient = config.knex.client
let knexConnection = config.knex.connection

global.knex = require('knex')(config.knex)

const sqlSelects = require('./sqlSelects')

// var bookshelf = require('bookshelf')(knex)

// var PlayerList = bookshelf.Model.extend({
// 	tableName: 'connected_players'
// })

// PlayerList.fetchAll().then(function(PlayerList){
// 	for(i in PlayerList.models) {
// 		log(PlayerList.models[i].attributes, 'lc', logFile.info, discordRoom.bot)
// 	}

// })



sqlSelects.sqlSelectPlayerListView().then(function (msg) {
	for(let i in msg) {
		log(msg[i].name, 'lc', logFile.info, discordRoom.bot)
	}
	process.exit()	
})

