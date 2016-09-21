// base.js

// Base functions for rustBot

const fs = require("fs");

//##################################################//
//						Logger						//
//##################################################//

//Type 0 is do nothing, type 1 is log to file, type 2 is 
//log to console and type 3 is log to rcon. They are stacking
//so type 3 will be logged to file and console in addition to rcon
exports.log = function (msg, type, color) {
	//rustify the date
    var date = new Date().toISOString()
                            .replace(/T/, ' ')
                            .replace(/\..+/, '');
    var text = msg;
    
    //log file, should already be created
    if(type>0)fs.appendFile('rcon.log', '['+date+'] ' + text + '\n');
    if(type>1){process.stdout.write('['+date+'] ' + text + '\n');}
    //type 3 so if(type>3) is going to be rcon leaving one other
    
    

}


