// base.js

// Base functions for rustBot

const fs = require("fs");

//##################################################//
//						Logger						//
//##################################################//

exports.log = function (msg, color) {
	//rustify the date
    var date = new Date().toISOString()
                            .replace(/T/, ' ')
                            .replace(/\..+/, '');
    var text = msg;
    
    process.stdout.write('['+date+'] ' + text + '\n');
    //log file, should already be created
    fs.appendFile('rcon.log', '['+date+'] ' + text + '\n');
}


