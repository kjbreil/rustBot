// logger.js

exports.log = function(msg, type, file, channel) {
	if(file == null){file = config.logFiles.rustbot};
	file = "logs/" + file
	let colorMsg = null
    let rconColorized = new RegExp(/o/) // o for colorize

	let date = dateFormat(Date(), "[mm-dd-yy hh:MM:ss]")
	// Log to console
    if(RegExp(/c/).test(type)) {process.stdout.write(date + ' ' + msg + '\n')}
	// Log to file
    if(RegExp(/l/).test(type)) {fs.appendFile(file, date + ' ' + msg + '\n')} 

    if(config.rconEnabled == 1) {
        if(colorMsg && RegExp(/r/).test(type)) {rcon.run('say ' + colorMsg)}
        else if(RegExp(/r/).test(type)){rcon.run('say ' + msg)}
    }
    if(RegExp(/d/).test(type) && config.discordEnabled == 1 && channel) {
        if(RegExp(/r/).test(type)) {discordMessage('SERVER: ' + msg, channel)}
        else {discordMessage(msg, channel)}
    }
    file = null

}

