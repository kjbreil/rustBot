// clientData.js

// Template file for rustBot matchers 

// Set the regex matching, must be same name as file

const base = require("./../lib/base");

clientDataRE  = new RegExp(/^([0-9.]{7,15})\:([0-9]*)\/([0-9]*)\/(.*)/);

exports.clientDataIF = function (line) {
	base.log(line, 1);
}