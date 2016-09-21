#!/usr/bin

const fs = require("fs");

var inputlogfile = "./exLog/gamelog-2016-09-17-03-00-01.log";


function log(msg, color) {
	//rustify the date
    var date = new Date().toISOString()
                            .replace(/T/, ' ')
                            .replace(/\..+/, '');
    var text = msg;
    
    process.stdout.write('['+date+'] ' + text + '\n');
    //log file, should already be created
    fs.appendFile('rcon.log', '['+date+'] ' + text + '\n');
}





// Rust log file date format (why am i keeping this???)
var date = new Date().toISOString()
                        .replace(/T/, ' ')
                        .replace(/\..+/, '');
//set the variables for the filedate format, YYYYMMDD_HHMM
var rightnow = new Date(),
	year = rightnow.getFullYear(),
	month = rightnow.getMonth(),
	day = rightnow.getDay()
	hour = rightnow.getHours()
	minute = rightnow.getMinutes();
var fileDate = String(year) + String(month) + String(day) + '_' + String(hour) + String(minute);
//Rename the old log file - fuck this for right now, will be implemented when live
// fs.rename('rcon.log',fileDate + '_rcon.log');
fs.writeFile('rcon.log','['+date+'] ' + 'RCON SCRIPT STARTED' + '\n');


var lineReader = require('readline').createInterface({
  terminal: false, input: fs.createReadStream(inputlogfile)
});



lineReader.on('line', function (line) {
  log(line);
});


