
// event.js

// [event] assets/prefabs/npc/patrol helicopter/patrolhelicopter.prefab
// [event] assets/prefabs/npc/cargo plane/cargo_plane.prefab

// (/^\[event\] (.+) (.+)$/)

let dT = 'lrod'

exports.rustEventGate = function(msg) {
	console.log('EVENT: ' + msg)
	msg = RegExp(/^\[event\] (.+) (.+)$/).exec(msg)
	if(msg[2] === 'helicopter/patrolhelicopter.prefab') {
		var message = [
			{'color' : 'default', 'text': 'get naked or kiss your ass goodbye, the '},
			{'color' : 'red', 'text' : 'heli '},
			{'color' : 'default', 'text' : 'is'},
			{'color' : 'green', 'text' : 'here'}
		]
		log(message, dT, logFile.rcon, discordRoom.chat)
	} else if (msg[2] === 'plane/cargo_plane.prefab') {
		console.log('EVENT: AD')
	} else {
		console.log('event error' + msg)
	}
}