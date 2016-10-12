// sqlSelects.js

exports.sqlSelectPlayerListView = function() {
	return new Promise(function(resolve, reject) {
		knex.select('to_char', 'steamid', 'name', 'ping', 'ip', 'health', 'currentlevel', 'unspentxp', 'violationlevel').from('connected_players').then(function(msg) {
			resolve(msg)
		})
	})
}