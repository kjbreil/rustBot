#!/usr/bin

//##################################################//
//					THE Constructs					//
//##################################################//

const base = require("./lib/base");

const fs = require("fs");

const clientDataCon = require("./matchers/clientData");

//##################################################//
//					THE Variables					//
//##################################################//

var inputlogfile = "./exLog/gamelog-2016-09-17-03-00-01.log";

//##################################################//
//					THE Functions					//
//##################################################//

// NONE

//##################################################//
//					THE Code						//
//##################################################//

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

//initialize linereader - this is a copy/past and should figure out how to do with const
var lineReader = require('readline').createInterface({
  terminal: false, input: fs.createReadStream(inputlogfile)
});


lineReader.on('line', function (line) {
  // base.log(line);
  // switch(line) {
  // 	case(): clientDataCon.clientDataSW(line); 
  // 	break;
  // }
  if(clientDataRE.test(line)) {clientDataCon.clientDataSW(line);}
  // clientDataCon.clientDataSW(line);

});


