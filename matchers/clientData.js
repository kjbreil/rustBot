// clientData.js

// Client data is not implemented yet but will be logon, disconnect messages

const base = require("./../lib/base");
const config = require('./../config.js');

clientDataRE  = new RegExp(/^([0-9.]{7,15})\:([0-9]*)\/([0-9]*)\/(.*)/);

exports.clientDataIF = function (line) {
	base.log(line, 1);
}