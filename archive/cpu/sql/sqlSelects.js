// sqlSelects.js

exports.sqlSelectPlayerListView = function() {
	return new Promise(function(resolve, reject) {
		knex.select('*').from('connected_players').then(function(msg) {
			resolve(msg)
		})
	})
}