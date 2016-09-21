#!/usr/bin

//##################################################//
//					THE Constructs					//
//##################################################//

const base = require('./lib/base');

const fs = require('fs');

const clientDataCon = require("./matchers/clientData");
const deathMessageCon = require("./matchers/deathMessage");


//##################################################//
//					THE Variables					//
//##################################################//

var inputlogfile = "./exLog/merged.log";

// Rust log file date format (why am i keeping this???)
var date = new Date().toISOString()
                        .replace(/T/, ' ')
                        .replace(/\..+/, '');
//set the variables for filedates 
var rightnow = new Date(),
	year = rightnow.getFullYear(),
	month = rightnow.getMonth(),
	day = rightnow.getDay()
	hour = rightnow.getHours()
	minute = rightnow.getMinutes();
// fileDate format - YYYYMMDD_HHMM
var fileDate = String(year) + String(month) + String(day) + '_' + String(hour) + String(minute);

//##################################################//
//					THE Functions					//
//##################################################//

// NONE its all in other files

//##################################################//
//					THE Code						//
//##################################################//

//Rename the old log file - fuck this for right now, will be implemented when live
// fs.rename('rcon.log',fileDate + '_rcon.log');
fs.writeFile('rcon.log','['+date+'] ' + 'RCON SCRIPT STARTED' + '\n');

//initialize linereader - this is a copy/paste and should figure out how to do with const
var lineReader = require('readline').createInterface({
  terminal: false, input: fs.createReadStream(inputlogfile)
});


// TODO: Make array from list of files in matchers with js extension
// use list in for statement to create if statement below keeping this at a couple lines
// NOTE: ATM Regex not working with switch statements has to be if statements
// Also does not look promising on the array, fuck

lineReader.on('line', function (line) {
  if(clientDataRE.test(line)) {clientDataCon.clientDataIF(line);}
  if(deathMessageRE.test(line)) {deathMessageCon.deathMessageIF(line);}
});


