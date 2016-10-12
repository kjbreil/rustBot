// // sqlTest.js



global.config = require('./../../config.js')


let knexClient = config.knex.client
let knexConnection = config.knex.connection

global.knex = require('knex')(config.knex)

var Model = require('objection').Model

const sqlSelects = require('./sqlSelects')

var bookshelf = require('bookshelf')(knex)

var PlayerList = bookshelf.Model.extend({
	tableName: 'connected_players'
})

PlayerList.fetchAll().then(function(PlayerList){
	for(i in PlayerList.models) {
		console.log(PlayerList.models[i].attributes)
	}

})



// sqlSelects.sqlSelectPlayerListView().then(function () {
// 	console.log('promise')
// 	process.exit()
// })

