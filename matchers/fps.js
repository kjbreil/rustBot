// fps.js

const base = require("./../lib/base");
const config = require('./../config.js');

fpsRE = new RegExp(/^(\d{1,3}) FPS/)

exports.fpsIF = function(msg) {
	base.log('[***fps***]'msg, 'lcd', null, 'rcon')
}