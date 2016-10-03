// deathMessage.js

// Template file for rustBot matchers 

// Set the regex matching, must be same name as file

const base = require("./../lib/base");
const config = require('./../config.js');
// Regex for matcher

deathMessageRE = new RegExp(/^[^[](.+?)\[\d+?\/(\d+?\]) /)

dT = 'ldr'

exports.deathMessageIF = function (line) {
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
					else base.log(line, 'l')
					break;
				case ('suicide'):
					var oo = new RegExp(/(.+?)\[\d+\/\d+\] \w+ (\w+) \w+ (\w+)/)
					if(o = oo.exec(line)){gotFedUp(line, o[1], o[2], o[3])}
					else base.log(line, 'l')
					break;
				default:
					base.log(k[1], 'l')
			}
			break;
		case ('died'):
			var oo = new RegExp(/(.+?)\[\d+\/\d+\] (\w+) \((\w+)\)/)
			if(o = oo.exec(line)){gotFedUp(line, o[1], o[2], o[3])}
			else base.log(line, '')
			base.log(line, '')
			break;
		case ('fired'): // Fired Bad projectile, will be logged soon
			base.log(line, '')
			break;
		case ('sent'): // Sent bad packed, will be logged soon
			base.log(line, '')
			break;
		case ('is'): // only seen this so far 'is inside an out of range building privilege.' but will be logged soon
			base.log(line, '')
			break;
		default:
			base.log(('########## || ' + line), 'lc')
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
	{'color' : 'default', 'text': name},
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
				{'color' : 'default', 'text': name},
				{'color' : 'default', 'text' : ''}
			]
			base.log(message, '', null, 'chat')
			break;
		case('Explosion'):  // how is suicide
			var message = [
				{'color' : 'darkgreen', 'text': name},
				{'color' : 'default', 'text' : 'was playing with '},
				{'color' : 'red', 'text' : 'explosives'},
				{'color' : 'default', 'text' : 'it did not go well'}
			]
			base.log(message, dT, null, 'chat')
			break;
		case('Stab'): // how is suicide - I really don't know how this happens
			var message = [
				{'color' : 'default', 'text': name},
				{'color' : 'default', 'text' : 'stabbed himself to death'}
			]
			base.log(message, dT, null, 'chat')
			break;
		case('Suicide'): // f1 - kill how is suicide
			var message = [
				{'color' : 'default', 'text': name},
				{'color' : 'default', 'text' : 'just couldn\'t take it anymore'}
			]
			base.log(message, dT, null, 'chat')
			break;
		case('Heat'):
			var message = [
				{'color' : 'default', 'text': name},
				{'color' : 'default', 'text' : 'was just too hot for this world'}
			]
			base.log(message, dT, null, 'chat')
			break;
		case('Bleeding'):
			var message = [
				{'color' : 'default', 'text': name},
				{'color' : 'default', 'text' : 'bled out'}
			]
			base.log(message, dT, null, 'chat')
			break;
		case('Slash'):
			var message = [
				{'color' : 'default', 'text': name},
				{'color' : 'default', 'text' : 'was slashed into pieces'}
			]
			base.log(message, dT, null, 'chat')
			break;
		case('Bite'):
			var message = [
				{'color' : 'default', 'text': name},
				{'color' : 'default', 'text' : 'should\'ve bit back'}
			]
			base.log(message, dT, null, 'chat')
			break;
		case('Fall'):
			var message = [
				{'color' : 'default', 'text': name},
				{'color' : 'default', 'text' : 'tried to fly but faceplanted into the ground'}
			]
			base.log(message, dT, null, 'chat')
			break;
		case('Cold'):
			var message = [
				{'color' : 'default', 'text': name},
				{'color' : 'default', 'text' : ''}
			]
			base.log(message, dT, null, 'chat')
			break;
		case('Drowned'):
			var message = [
				{'color' : 'default', 'text': name},
				{'color' : 'default', 'text' : 'succumbed to the cold'}
			]
			base.log(message, dT, null, 'chat')
			break;
		case('Hunger'):
			var message = [
				{'color' : 'default', 'text': name},
				{'color' : 'default', 'text' : 'forgot to eat'}
			]
			base.log(message, dT, null, 'chat')
			break;
		case('Blunt'):
			var message = [
				{'color' : 'default', 'text': name},
				{'color' : 'default', 'text' : 'died by blunt trama'}
			]
			base.log(message, dT, null, 'chat')
			break;
		case(''):
			var message = [
				{'color' : 'default', 'text': name},
				{'color' : 'default', 'text' : ''}
			]
			base.log(message, dT, null, 'chat')
			break;
		default:
			base.log('########## || ' + how + ' || ' +  byWhat, 'lcd')
	}
	
	
	// base.log(line, 'l')
}

gotKilled = function (line, name, how, byWhat) {
	switch(byWhat){
		case ('bear'):
			var message = [
				{'color' : 'default', 'text': name},
				{'color' : 'default', 'text' : 'was mauled by a bear'}
			]
			base.log(message, dT, null, 'chat')
			break;
		case ('landmine'):
			var message = [
				{'color' : 'default', 'text': name},
				{'color' : 'default', 'text' : 'stepped on a landmine'}
			]
			base.log(message, dT, null, 'chat')
			break;
		case ('Drowned'):
			var message = [
				{'color' : 'darkgreen', 'text': name},
				{'color' : 'default', 'text' : 'went for a swim and never came back'}
			]
			base.log(message, dT, null, 'chat')
			break;
		case ('patrolhelicopter'):
			var message = [
				{'color' : 'default', 'text': name},
				{'color' : 'default', 'text' : 'fought the heli, the heli won'}
			]
			base.log(message, dT, null, 'chat')
			break;
		case ('barricade'):
			var message = [
				{'color' : 'default', 'text': name},
				{'color' : 'default', 'text' : 'was playing on a barricade and died'}
			]
			base.log(message, dT, null, 'chat')
			break;
		case ('autoturret_deployed'):
			var message = [
				{'color' : 'default', 'text': name},
				{'color' : 'default', 'text' : 'got blasted by an autoturret'}
			]
			base.log(message, dT, null, 'chat')
			break;
		case ('Blunt'):
			var message = [
				{'color' : 'default', 'text': name},
				{'color' : 'default', 'text' : 'died by blunt trama'}
			]
			base.log(message, dT, null, 'chat')
			break;
		case ('Hunger'):
			var message = [
				{'color' : 'default', 'text': name},
				{'color' : 'default', 'text' : 'forgot to eat'}
			]
			base.log(message, dT, null, 'chat')
			break;
		case ('wall'):
			var message = [
				{'color' : 'default', 'text': name},
				{'color' : 'default', 'text' : 'tried jumping over a wall but died instead'}
			]
			base.log(message, dT, null, 'chat')
			break;
		case ('cactus'):
			var message = [
				{'color' : 'default', 'text': name},
				{'color' : 'default', 'text' : 'had sex with a cactus'}
			]
			base.log(message, dT, null, 'chat')
			break;
		case ('Poison'):
			var message = [
				{'color' : 'default', 'text': name},
				{'color' : 'default', 'text' : 'ate some bad food and died'}
			]
			base.log(message, dT, null, 'chat')
			break;
		case ('wolf'):
			var message = [
				{'color' : 'default', 'text': name},
				{'color' : 'default', 'text' : 'was eaten by a wolf'}
			]
			base.log(message, dT, null, 'chat')
			break;
		case ('Cold'):
			var message = [
				{'color' : 'default', 'text': name},
				{'color' : 'default', 'text' : 'froze to death'}
			]
			base.log(message, dT, null, 'chat')
			break;
		case ('fall'):
			var message = [
				{'color' : 'default', 'text': name},
				{'color' : 'default', 'text' : 'tried to fly but faceplanted into the ground'}
			]
			base.log(message, dT, null, 'chat')
			break;
		case('spikes'):
			var message = [
				{'color' : 'default', 'text': name},
				{'color' : 'default', 'text' : 'impaled by floor spikes'}
			]
			base.log(message, dT, null, 'chat')
			break;
		case('campfire'):
			var message = [
				{'color' : 'default', 'text': 'Jack be Nimble Jack be quick'},
				{'color' : 'red', 'text' : name},
				{'color' : 'default', 'text' : 'sat on the candle stick'}
			]
			base.log(message, dT, null, 'chat')
			break;
		case('oilfireballsmall'):
			var message = [
				{'color' : 'default', 'text': name},
				{'color' : 'default', 'text' : 'burnt alive'}
			]
			base.log(message, dT, null, 'chat')
			break;
		case(''):
			var message = [
				{'color' : 'default', 'text': name},
				{'color' : 'default', 'text' : ''}
			]
			base.log(message, dT, null, 'chat')
			break;
		default:
			base.log('########## || ' + how + ' || ' +  byWhat, 'lcd')
	}
}

function pvp(line, name, killer){
	base.log(killer + ' killed ' + name, '')
	base.log(line, '')	
}
