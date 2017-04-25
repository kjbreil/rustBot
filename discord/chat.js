

var exports = module.exports = {}

exports.type = function(msg) {
	return new Promise( (resolve,reject) => {
		if (msg.content.charAt(0) === '.') {
			if ( cmd = msg.content.substr(0, msg.content.indexOf(' ') )  ) {
				reject(cmd)
			} else {
				reject(msg.content)
			}
		} else {
			resolve()
		}
	})
}