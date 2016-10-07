// fsUtils.js

const fs = require('fs')

exports.createDirectories = function() {
	for (let i in config.reDir) {
		try {
		    let stats = fs.lstatSync('.\/' + config.reDir[i])
		    if (stats.isDirectory()) {}
		} catch (e) { fs.mkdirSync('.\/' + config.reDir[i]) }
	}
}

exports.renameLogFiles = function() {
	for (let i in config.logFiles) {
		try {
		    let stats = fs.lstatSync(config.logFileLocation + i + '.log')
		    if (stats.isFile()) {
		    	let fileDate = dateFormat(new Date(), "yyyymmdd_hhMMss")
		    	fs.rename(config.logFileLocation + i + '.log',config.logFileLocation +  fileDate + '_' + i + '.log')
		    }
		} catch (e) {}
	}
}