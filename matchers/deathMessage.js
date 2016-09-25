// deathMessage.js

// Template file for rustBot matchers 

// Set the regex matching, must be same name as file

const base = require("./../lib/base");
// Regex for matcher

deathMessageRE = new RegExp(/^[^[](.+?)\[\d+?\/(\d+?\]) /)

dT = ''

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
by someone truthfully I don't really know the difference sometimes but its how they show up in the log. Each function 
is a switch which takes the byWhat string matches them int he choose part. Each choose consists of an array and sending 
the array to the log function. The array allows you to assign colors to blocks of text which will be combined together 
and colorized in rust chat. Don't worry about spaces at the end or begining, the code takes care of spacing.

The arrage is called message, below is a very basic one which passes the name of person killed and then a blank text
block, it would look like this 'SERVER Otto the Caddy' and in black text.

var message = [
	{'color' : 'black', 'text': name},
	{'color' : 'black', 'text' : ''}
]

You have 3 variables available, name, how and byWhat but I would only recommend using name as the other two are static.
The variables can be anwhere in the text so this works

var message = [
	{'color' : 'black', 'text': 'Jack be Nimble Jack be quick'},
	{'color' : 'red', 'text' : name},
	{'color' : 'black', 'text' : 'sat on the candle stick'}
]

*/


gotFedUp = function (line, name, how, byWhat){
	switch (byWhat){
		case ('Generic'): // when an Admin goes into spectate mode
			var message = [
				{'color' : 'black', 'text': name},
				{'color' : 'black', 'text' : ''}
			]
			base.log(message, '')
			break;
		case('Explosion'):  // how is suicide
			var message = [
				{'color' : 'darkgreen', 'text': name},
				{'color' : 'black', 'text' : 'was playing with '},
				{'color' : 'red', 'text' : 'explosives'},
				{'color' : 'black', 'text' : 'it did not go well'}
			]
			base.log(message, dT)
			break;
		case('Stab'): // how is suicide - I really don't know how this happens
			var message = [
				{'color' : 'black', 'text': name},
				{'color' : 'black', 'text' : 'stabbed himself to death'}
			]
			base.log(message, 'l')
			break;
		case('Suicide'): // f1 - kill how is suicide
			var message = [
				{'color' : 'black', 'text': name},
				{'color' : 'black', 'text' : 'just couldn\'t take it anymore'}
			]
			base.log(message, 'lc')
			break;
		case('Heat'):
			var message = [
				{'color' : 'black', 'text': name},
				{'color' : 'black', 'text' : 'was just too hot for this world'}
			]
			base.log(message, '')
			break;
		case('Bleeding'):
			var message = [
				{'color' : 'black', 'text': name},
				{'color' : 'black', 'text' : ''}
			]
			base.log(message, '')
			break;
		case('Slash'):
			var message = [
				{'color' : 'black', 'text': name},
				{'color' : 'black', 'text' : ''}
			]
			base.log(message, '')
			break;
		case('Bite'):
			var message = [
				{'color' : 'black', 'text': name},
				{'color' : 'black', 'text' : ''}
			]
			base.log(message, '')
			break;
		case('Fall'):
			var message = [
				{'color' : 'black', 'text': name},
				{'color' : 'black', 'text' : ''}
			]
			base.log(message, '')
			break;
		case('Cold'):
			var message = [
				{'color' : 'black', 'text': name},
				{'color' : 'black', 'text' : ''}
			]
			base.log(message, '')
			break;
		case('Drowned'):
			var message = [
				{'color' : 'black', 'text': name},
				{'color' : 'black', 'text' : ''}
			]
			base.log(message, '')
			break;
		case('Hunger'):
			var message = [
				{'color' : 'black', 'text': name},
				{'color' : 'black', 'text' : ''}
			]
			base.log(message, '')
			break;
		case('Blunt'):
			var message = [
				{'color' : 'black', 'text': name},
				{'color' : 'black', 'text' : ''}
			]
			base.log(message, '')
			break;
		case(''):
			var message = [
				{'color' : 'black', 'text': name},
				{'color' : 'black', 'text' : ''}
			]
			base.log(message, '')
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
				{'color' : 'black', 'text': name},
				{'color' : 'black', 'text' : ''}
			]
			base.log(message, '')
			break;
		case ('landmine'):
			var message = [
				{'color' : 'black', 'text': name},
				{'color' : 'black', 'text' : ''}
			]
			base.log(message, '')
			break;
		case ('Drowned'):
			var message = [
				{'color' : 'black', 'text': name},
				{'color' : 'black', 'text' : ''}
			]
			base.log(message, '')
			break;
		case ('patrolhelicopter'):
			var message = [
				{'color' : 'black', 'text': name},
				{'color' : 'black', 'text' : ''}
			]
			base.log(message, '')
			break;
		case ('barricade'):
			var message = [
				{'color' : 'black', 'text': name},
				{'color' : 'black', 'text' : ''}
			]
			base.log(message, '')
			break;
		case ('autoturret_deployed'):
			var message = [
				{'color' : 'black', 'text': name},
				{'color' : 'black', 'text' : ''}
			]
			base.log(message, '')
			break;
		case ('Blunt'):
			var message = [
				{'color' : 'black', 'text': name},
				{'color' : 'black', 'text' : ''}
			]
			base.log(message, '')
			break;
		case ('Hunger'):
			var message = [
				{'color' : 'black', 'text': name},
				{'color' : 'black', 'text' : ''}
			]
			base.log(message, '')
			break;
		case ('wall'):
			var message = [
				{'color' : 'black', 'text': name},
				{'color' : 'black', 'text' : ''}
			]
			base.log(message, '')
			break;
		case ('cactus'):
			var message = [
				{'color' : 'black', 'text': name},
				{'color' : 'black', 'text' : ''}
			]
			base.log(message, '')
			break;
		case ('Poison'):
			var message = [
				{'color' : 'black', 'text': name},
				{'color' : 'black', 'text' : ''}
			]
			base.log(message, '')
			break;
		case ('wolf'):
			var message = [
				{'color' : 'black', 'text': name},
				{'color' : 'black', 'text' : ''}
			]
			base.log(message, '')
			break;
		case ('Cold'):
			var message = [
				{'color' : 'black', 'text': name},
				{'color' : 'black', 'text' : ''}
			]
			base.log(message, '')
			break;
		case ('fall'):
			var message = [
				{'color' : 'black', 'text': name},
				{'color' : 'black', 'text' : ''}
			]
			base.log(message, '')
			break;
		case('spikes'):
			var message = [
				{'color' : 'black', 'text': name},
				{'color' : 'black', 'text' : ''}
			]
			base.log(message, '')
			break;
		case('campfire'):
			var message = [
				{'color' : 'black', 'text': name},
				{'color' : 'black', 'text' : ''}
			]
			base.log(message, '')
			break;
		case('oilfireballsmall'):
			var message = [
				{'color' : 'black', 'text': name},
				{'color' : 'black', 'text' : ''}
			]
			base.log(message, '')
			break;
		case(''):
			var message = [
				{'color' : 'black', 'text': name},
				{'color' : 'black', 'text' : ''}
			]
			base.log(message, '')
			break;
		default:
			base.log('########## || ' + how + ' || ' +  byWhat, 'lcd')
	}
}

function pvp(line, name, killer){
	base.log(killer + ' killed ' + name, '')
	base.log(line, '')	
}
