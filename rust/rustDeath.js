// deathMessage.js

// Template file for rustBot matchers 

// Set the regex matching, must be same name as file

// Regex for matcher

// PVP Regex (^.+)\[(\d+)\/(\d+)\] was killed by (.+)\[(\d+)\/(\d+)\]$
// SomeName[203850/76561198006975221] was killed by Laughing Riot[341768/76561198177634809]

let dT = 'rod'

exports.deathMessageIF = function (line) {
	console.log(line)
	var d = new RegExp(/^(.+?)\[\d+?\/(\d+?)\] (.+?) /).exec(line);
	var d = d[3]
	switch (d) {
		case ('was'):
			var k = new RegExp(/.+?\[\d+\/\d+\] \w+ (\w+) /).exec(line)
			switch(k[1]){
				case ('killed'):
					var pp = new RegExp(/(.+?)\[\d+\/\d+\] \w+ \w+ \w+? (.+?)\[\d+\/(\d+?)\]$/)
					var oo = new RegExp(/(.+?)\[\d+\/\d+\] \w+ (\w+) \w+ (\w+)/)
					if(p = pp.exec(line)){pvp(line, p[1], p[2])}
					else if(o = oo.exec(line)){gotKilled(line, o[1], o[2], o[3])}
					else log(line, 'l', logFile.chat, null)
					break;
				case ('suicide'):
					var oo = new RegExp(/(.+?)\[\d+\/\d+\] \w+ (\w+) \w+ (\w+)/)
					if(o = oo.exec(line)){gotFedUp(line, o[1], o[2], o[3])}
					else log(line, 'l', logFile.chat, null)
					break;
				default:
					log(k[1], 'l', logFile.chat, null)
			}
			break;
		case ('died'):
			var oo = new RegExp(/(.+?)\[\d+\/\d+\] (\w+) \((\w+)\)/)
			if(o = oo.exec(line)){gotFedUp(line, o[1], o[2], o[3])}
			else log(line, 'l', logFile.rust, null)
			log(line, 'l', logFile.rust, null)
			break;
		case ('fired'): // Fired Bad projectile, will be logged soon
			log(line, 'l', logFile.rust, null)
			break;
		case ('sent'): // Sent bad packed, will be logged soon
			log(line, 'l', logFile.rust, null)
			break;
		case ('is'): // only seen this so far 'is inside an out of range building privilege.' but will be logged soon
			log(line, 'l', logFile.rust, null)
			break;
		default:
			log('########## || ' + line, 'l', logFile.rust, null)
	}
	
}

/*

How to create kill messages.

There are two functions, gotFedUp and gotKilled. This corresponds to if it was a death/suicide or if they were killed 
by someone but truthfully I don't really know the difference sometimes but its how they show up in the log. Each function 
is a switch which takes the byWhat string matches them in the choose part. Each choose consists of an array and then sending 
the array to the log function. The array allows you to assign colors to blocks of text which will be combined together 
and colorized and shown in rust chat. Don't worry about spaces at the end or begining of text, the code takes care of spacing.

The arrage is called message, below is a very basic one which passes the name of person killed and then a blank text
block, it would look like this 'SERVER Otto the Caddy' and in default text.

var message = [
	{'color' : 'green', 'text': name},
	{'color' : 'default', 'text' : ''}
]

You have 3 variables available, name, how and byWhat but I would only recommend using name as the other two are static.
The variables can be anwhere in the text so this works

var message = [
	{'color' : 'default', 'text': 'Jack be Nimble Jack be quick'},
	{'color' : 'red', 'text' : name},
	{'color' : 'default', 'text' : 'sat on the candle stick'}
]

Here are some examples of what is in the log:
gotFedUp has two types fed into it, where the how is suicide or just a died type, first 4 are suicides, rest are dieds
how is suicide: Otto the Caddy[2030269/76561198014626147] was suicide by Suicide
died: Otto the Caddy[2030269/76561198014626147] died (Heat)

gotKilled examples are coming soon


*/


gotFedUp = function (line, name, how, byWhat){
	switch (byWhat){
		case ('Generic'): // when an Admin goes into spectate mode
			var message = [
				{'color' : 'green', 'text': name},
				{'color' : 'default', 'text' : ''}
			]
			log(message, 'l', logFile.chat, null)
			break;
		case('Explosion'):  // how is suicide
			var message = [
				{'color' : 'darkgreen', 'text': name},
				{'color' : 'default', 'text' : 'was playing with '},
				{'color' : 'red', 'text' : 'explosives'},
				{'color' : 'default', 'text' : 'it did not go well'}
			]
			log(message, dT, logFile.rcon, discordRoom.chat)
			break;
		case('Stab'): // how is suicide - I really don't know how this happens
			var message = [
				{'color' : 'green', 'text': name},
				{'color' : 'default', 'text' : 'was going for the darwin award, just might win it with that death'}
			]
			log(message, dT, logFile.rcon, discordRoom.chat)
			break;
		case('Suicide'): // f1 - kill how is suicide
			var message = [
				{'color' : 'green', 'text': name},
				{'color' : 'default', 'text' : 'just couldn\'t take it anymore'}
			]
			log(message, dT, logFile.rcon, discordRoom.chat)
			break;
		case('Heat'):
			var message = [
				{'color' : 'green', 'text': name},
				{'color' : 'default', 'text' : 'was just too hot for this world'}
			]
			log(message, dT, logFile.rcon, discordRoom.chat)
			break;
		case('Bleeding'):
			var message = [
				{'color' : 'green', 'text': name},
				{'color' : 'default', 'text' : 'bled out'}
			]
			log(message, dT, logFile.rcon, discordRoom.chat)
			break;
		case('Slash'):
			var message = [
				{'color' : 'green', 'text': name},
				{'color' : 'default', 'text' : 'was slashed into pieces'}
			]
			log(message, dT, logFile.rcon, discordRoom.chat)
			break;
		case('Bite'):
			var message = [
				{'color' : 'green', 'text': name},
				{'color' : 'default', 'text' : 'should\'ve bit back'}
			]
			log(message, dT, logFile.rcon, discordRoom.chat)
			break;
		case('Fall'):
			var message = [
				{'color' : 'green', 'text': name},
				{'color' : 'default', 'text' : 'tried to fly but faceplanted into the ground'}
			]
			log(message, dT, logFile.rcon, discordRoom.chat)
			break;
		case('Cold'):
			var message = [
				{'color' : 'green', 'text': name},
				{'color' : 'default', 'text' : 'succumbed to the cold'}
			]
			log(message, dT, logFile.rcon, discordRoom.chat)
			break;
		case('Drowned'):
			var message = [
				{'color' : 'green', 'text': name},
				{'color' : 'default', 'text' : 'Went for a swim and never came back'}
			]
			log(message, dT, logFile.rcon, discordRoom.chat)
			break;
		case('Hunger'):
			var message = [
				{'color' : 'green', 'text': name},
				{'color' : 'default', 'text' : 'forgot to eat'}
			]
			log(message, dT, logFile.rcon, discordRoom.chat)
			break;
		case('Blunt'):
			var message = [
				{'color' : 'green', 'text': name},
				{'color' : 'default', 'text' : 'died by blunt trama'}
			]
			log(message, dT, logFile.rcon, discordRoom.chat)
			break;
		// case(''):
		// 	var message = [
		// 		{'color' : 'green', 'text': name},
		// 		{'color' : 'default', 'text' : ''}
		// 	]
		// 	log(message, dT, logFile.rcon, discordRoom.chat)
		// 	break;
		default:
			base.log('########## || ' + how + ' || ' +  byWhat, 'l', null, discordRoom.chat)
	}
	
	
	// log(line, 'l')
}

/*

				{'color' : 'red', 'text' : 'red'},
				{'color' : 'green', 'text' : 'green'},
				{'color' : 'blue', 'text' : 'blue'},
				{'color' : 'yellow', 'text' : 'yellow'},
				{'color' : 'purple', 'text' : 'purple'},

*/


gotKilled = function (line, name, how, byWhat) {
	switch(byWhat){
		case ('bear'):
			var message = [
				{'color' : 'green', 'text': name},
				{'color' : 'default', 'text' : 'was mauled by a bear'}
			]
			log(message, dT, logFile.rcon, discordRoom.chat)
			break;
		case ('landmine'):
			var message = [
				{'color' : 'green', 'text': name},
				{'color' : 'default', 'text' : 'stepped on a landmine'}
			]
			log(message, dT, logFile.rcon, discordRoom.chat)
			break;
		case ('Drowned'):
			var message = [
				{'color' : 'green', 'text': name},
				{'color' : 'default', 'text' : 'went for a swim and never came back'}
			]
			log(message, dT, logFile.rcon, discordRoom.chat)
			break;
		case ('patrolhelicopter'):
			var message = [
				{'color' : 'green', 'text': name},
				{'color' : 'default', 'text' : 'fought the heli, the heli won'}
			]
			log(message, dT, logFile.rcon, discordRoom.chat)
			break;
		case ('barricade'):
			var message = [
				{'color' : 'green', 'text': name},
				{'color' : 'default', 'text' : 'was playing on a barricade and died'}
			]
			log(message, dT, logFile.rcon, discordRoom.chat)
			break;
		case ('autoturret_deployed'):
			var message = [
				{'color' : 'green', 'text': name},
				{'color' : 'default', 'text' : 'got blasted by an autoturret'}
			]
			log(message, dT, logFile.rcon, discordRoom.chat)
			break;
		case ('Blunt'):
			var message = [
				{'color' : 'green', 'text': name},
				{'color' : 'default', 'text' : 'died by blunt trama'}
			]
			log(message, dT, logFile.rcon, discordRoom.chat)
			break;
		case ('Hunger'):
			var message = [
				{'color' : 'green', 'text': name},
				{'color' : 'default', 'text' : 'forgot to eat'}
			]
			log(message, dT, logFile.rcon, discordRoom.chat)
			break;
		case ('wall'):
			var message = [
				{'color' : 'green', 'text': name},
				{'color' : 'default', 'text' : 'tried jumping over a wall but died instead'}
			]
			log(message, dT, logFile.rcon, discordRoom.chat)
			break;
		case ('cactus'):
			var message = [
				{'color' : 'green', 'text': name},
				{'color' : 'default', 'text' : 'had sex with a cactus'}
			]
			log(message, dT, logFile.rcon, discordRoom.chat)
			break;
		case ('Poison'):
			var message = [
				{'color' : 'green', 'text': name},
				{'color' : 'default', 'text' : 'ate some bad food and died'}
			]
			log(message, dT, logFile.rcon, discordRoom.chat)
			break;
		case ('wolf'):
			var message = [
				{'color' : 'green', 'text': name},
				{'color' : 'default', 'text' : 'was eaten by a wolf'}
			]
			log(message, dT, logFile.rcon, discordRoom.chat)
			break;
		case ('Cold'):
			var message = [
				{'color' : 'green', 'text': name},
				{'color' : 'default', 'text' : 'froze to death'}
			]
			log(message, dT, logFile.rcon, discordRoom.chat)
			break;
		case ('fall'):
			var message = [
				{'color' : 'green', 'text': name},
				{'color' : 'default', 'text' : 'tried to '},
				{'color' : 'blue', 'text' : ' fly '},
				{'color' : 'default', 'text' : 'but faceplanted into the ground'}
			]
			log(message, dT, logFile.rcon, discordRoom.chat)
			break;
		case('spikes'):
			var message = [
				{'color' : 'green', 'text': name},
				{'color' : 'default', 'text' : 'impaled by floor spikes'}
			]
			log(message, dT, logFile.rcon, discordRoom.chat)
			break;
		case('campfire'):
			var message = [
				{'color' : 'default', 'text': 'Jack be Nimble Jack be quick'},
				{'color' : 'red', 'text' : name},
				{'color' : 'default', 'text' : 'sat on the candle stick'}
			]
			log(message, dT, logFile.rcon, discordRoom.chat)
			break;
		case('oilfireballsmall'):
			var message = [
				{'color' : 'green', 'text': name},
				{'color' : 'red', 'text' : 'burnt'},
				{'color' : 'default', 'text' : 'alive'}
			]
			log(message, dT, logFile.rcon, discordRoom.chat)
			break;
		// case(''):
		// 	var message = [
		// 		{'color' : 'green', 'text': name},
		// 		{'color' : 'default', 'text' : ''}
		// 	]
		// 	log(message, dT, logFile.rcon, discordRoom.chat)
		// 	break;
		default:
			base.log('########## || ' + how + ' || ' +  byWhat, 'l', null, discordRoom.chat)
	}
}

function pvp(line, name, killer){
	// 1:Victim 2:? 3:Victim SteamID 4:Killer 5:? 6:Killer SteamID
	line = RegExp(/(^.+)\[(\d+)\/(\d+)\] was killed by (.+)\[(\d+)\/(\d+)\]$/).exec(line)
    rust.rconListPlayers.getPlayerIsOnline(line[3]).then(function (pa) {
    	if(pa) {
			var message = [
				{'color' : 'red', 'text': killer},
				{'color' : 'default', 'text' : 'killed'},
				{'color' : 'green', 'text' : name}
			]
			log(message, dT, logFile.rcon, discordRoom.chat)
    	} else {
			var message = [
				{'color' : 'red', 'text': killer},
				{'color' : 'default', 'text' : 'harvested '},
				{'color' : 'green', 'text' : name}
			]
			log(message, dT, logFile.rcon, discordRoom.chat)
    	}
    }).catch(function (err) {
        console.log(err)
    })
}
