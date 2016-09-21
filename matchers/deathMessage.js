// deathMessage.js

// Template file for rustBot matchers 

// Set the regex matching, must be same name as file

const base = require("./../lib/base");
// Regex for matcher
deathMessageRE = new RegExp(/^[^[](.+?)\[[0-9]+\/[0-9]+\].*(\w+)/);



pvpRE      = new RegExp(/^(.+?)\[[0-9]+\/[0-9]+\] was killed by (.+?)\[[0-9]+\/[0-9]+\]/);
npcRE   = new RegExp(/^(.+?)\[[0-9]+\/[0-9]+\] was killed by (.+?)\.prefab \((\w+)\)/);
deathRE        = new RegExp(/^(.+?)\[[0-9]+\/[0-9]+\] died \((\w+)\)/);
gendRE       = new RegExp(/^(.+?)\[[0-9]+\/[0-9]+\] was killed by (\w+)/);

exports.deathMessageIF = function (line) {
	if(names = pvpRE.exec(line)) {
		base.log(names[1] + ' killed ' + names[2], 2)
		base.log(line, 1)
	}
	if(npcRE.test(line)) {
		base.log('npcRE', 1)
		base.log(line, 1)
	}
	if(deathRE.test(line)) {
		base.log('deathRE', 1)
		base.log(line, 1)
	}
	if(gendRE.test(line)) {
		base.log('gendRE', 1)
		base.log(line, 1)
	}
}