// logger.js

exports.log = function(msg, type, file, channel) {
	if(file == null){file = config.logFiles.rustbot};
	file = "logs/" + file
	let colorMsg = null
    if (RegExp(/o/).test(type)) {correctSpaces()}

	let date = dateFormat(Date(), "[mm-dd-yy hh:MM:ss]")
	// Log to console
    if(RegExp(/c/).test(type)) {console.log(date + ' ' + JSON.stringify(msg) + '\n')}
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

correctSpaces = function (msg) {
	    plMsg = ''
        for (let i in msg) {
            msg[i].text = msg[i].text.trim()
            plMsg = plMsg + msg[i].text + ' '
        }
        colorMsg = colorizeMessage(msg)
        msg = plMsg
}

colorizeMessage = function (a){
    var finalText = ''
    for (var i = 0, len = a.length; i < len; i++) {
        a[i].text = a[i].text.trim()
        a[i].color = a[i].color.trim()
        a[i].color = convert.colorHex(a[i].color)
        a[i].color = '<color=' + a[i].color + '>'
        a[i].text = a[i].text + '</color> '
        finalText = finalText + a[i].color + a[i].text;
    }
    return finalText;
}