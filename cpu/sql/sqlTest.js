// sqlTest.js



global.config = require('./../../config.js')


let knexClient = config.knex.client
let knexConnection = config.knex.connection

console.log(config.knex)


global.knex = require('knex')(config.knex)

// datetime, ip, port, steamid, name, connect, os, os_steamid, disconnect, disconnect_why, auth, auth_level

// knex.select('datetime', 'ip', 'port').from('connect_log').then(function (msg) {
// 	console.log(msg)
// })

var lineReader = require('line-reader');


var bookshelf = require('bookshelf')(knex);

var connectLog = bookshelf.Model.extend({
  tableName: 'connect_log'
}, {
	bySteamID: function(steamid) {
        return this.forge().query({where:{ steamid: steamid }}).fetch();
    }
})

var connectLogs = bookshelf.Collection.extend({  
    model: connectLog
});

connectLog.fetchAll().fetch().then(function(connections) {
	console.log(connections.get('steamid'))
})

// connectLog.bySteamID('76561198006975241')

// var bookshelf = require('bookshelf')(knex);

// var connect_log = bookshelf.Model.extend({
// 	tableName: 'connect_log',
// })
// datetime, ip, port, steamid, name, connect, os, os_steamid, disconnect, disconnect_why, auth, auth_level

startLineReader = function() {
	lineReader.eachLine('merged.log', function(line, last) {
		deathToSql(line).then(function(line) {
			connectLogToSQL(line).then(function(line) {
				if(line === '') {

				} else if (line === '\n') {
					
				} else {
					// console.log(line)
				}
				
			}).catch(function(err) {

			})
		}).catch(function (err) {
            // console.log('skipped')
        })
		
	})
}

