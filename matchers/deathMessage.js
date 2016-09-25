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
		default:
			base.log(descriptor, 'l')
	}
	
}

				// {'color' : 'green', 'text' : ''},
				// {'color' : 'green', 'text' : ''}

gotFedUp = function (line, name, how, bywhat){
	switch (bywhat){
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
			base.log(message, 'lc')
			break;
		case('Suicide'): // f1 - kill
			var message = [
				{'color' : 'black', 'text': name},
				{'color' : 'black', 'text' : 'just couldn\'t take it anymore'}
			]
			base.log(message, '')
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
		case(''):
			var message = [
				{'color' : 'black', 'text': name},
				{'color' : 'black', 'text' : ''}
			]
			base.log(message, '')
			break;
		default:
			base.log('########## || ' how + ' || ' + byWhat, 'ld')
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
		case(''):
			var message = [
				{'color' : 'black', 'text': name},
				{'color' : 'black', 'text' : ''}
			]
			base.log(message, '')
			break;
		default:
			base.log('########## || ' how + ' || ' + byWhat, 'ld')
	}
}

function pvp(line, name, killer){
	base.log(killer + ' killed ' + name, '')
	base.log(line, '')	
}

function death1(line, names) {
	base.log('death1', 1)
	base.log(line, 1)
	var sC = '</color>'
	var color1 = '<color=#4d4dff>'
	var color2 = '<color=#ff9933>'
	var death1type = deathAll
	var reason = names[2].toLowerCase()
	if(reason == 'generic')			{base.log(color1 + names[1] + sC + ' died genericly', 1)}
	else if (reason == 'cold')		{base.log(color1 + names[1] + sC + ' succumbed to the cold', death1type);}
	else if (reason == 'bleeding')	{base.log(color1 + names[1] + sC + ' bled out', death1type);}
	else if (reason == 'heat')		{base.log(color1 + names[1] + sC + ' was just too hot for this world', death1type);}
	else if (reason == 'suicide')	{base.log(color1 + names[1] + sC + ' was done with with world and ended it', death1type);}
	else if (reason == 'slash')		{base.log(color1 + names[1] + sC + ' was slashed into pieces', death1type);}
	else if (reason == 'hunger')	{base.log(color1 + names[1] + sC + ' was hungers, is now dead', death1type);}
	else if (reason == 'bite')		{base.log(color1 + names[1] + sC + ' should\'ve bit back', death1type);}
	else if (reason == 'fall')		{base.log(color1 + names[1] + sC + ' tried to fly but faceplanted into the ground', death1type);}
	else if (reason == 'drowned')	{base.log(color1 + names[1] + sC + ' went for a swim and never came back', death1type);}
	else 							{base.log('DNF ' + names[1] + '|' + names[2] + '|' + line, 1)}
}

function death2(line, names) {
	base.log('death2',1)
	base.log(line, 1)
	var sC = '</color>'
	var color1 = '<color=#4d4dff>'
	var color2 = '<color=#ff9933>'
	var death2type = deathAll
	var reason = names[2].toLowerCase();
	if(reason == 'bear')					{base.log(color1 + names[1] + sC + ' was mauled by a bear', death2type);}
	else if(reason == 'wolf')				{base.log(color1 + names[1] + sC + ' was eaten by a wolf', death2type);}
	else if(reason == 'poison')				{base.log(color1 + names[1] + sC + ' ate some bad food and died', death2type);}
	else if(reason == 'wall')				{base.log(color1 + names[1] + sC + ' was trying to jump over a wall, it didn\'t work', death2type);}
	else if(reason == 'drowned')			{base.log(color1 + names[1] + sC + ' went for a swim and never came back', death2type);}
	else if(reason == 'autoturret_deployed'){base.log(color1 + names[1] + sC + ' got blasted by an autoturret', death2type);}
	else if(reason == 'patrolhelicopter')	{base.log(color1 + names[1] + sC + ' fought the heli, the heli won', death2type);}
	else if(reason == 'landmine')			{base.log(color1 + names[1] + sC + ' stepped on a landmine', death2type);}
	else if(reason == 'cactus')				{base.log(color1 + names[1] + sC + ' tried having sex with a cactus and bled to death', death2type);}
	else if(reason == 'cold')				{base.log(color1 + names[1] + sC + ' froze to death', death2type);}
	else if(reason == 'hunger')				{base.log(color1 + names[1] + sC + ' forgot to eat', death2type);}
	else if(reason == 'blunt')				{base.log(color1 + names[1] + sC + ' was smoking a blunt and died', death2type);}
	else if(reason == 'barricade')			{base.log(color1 + names[1] + sC + ' was playing on a barricade and died', death2type);}
	else if(reason == 'spikes')				{base.log(color1 + names[1] + sC + ' impaled by floor spikes', death2type);}
	else if(reason == 'campfire')			{base.log(color1 + names[1] + sC + ' tried walking on a campfire', death2type);}
	else if(reason == 'oilfireballsmall')	{base.log(color1 + names[1] + sC + ' burnt alive', death2type);}
	else 									{base.log('DNF ' + names[1] + '|' + names[2] + '|' + line, 1)}
	
}

function suicide(line, names) {
	base.log('death1', 1)
	base.log(line, 1)
	var suicidetype = deathAll
	var reason = names[2].toLowerCase()
	if(reason == 'explosion')			{base.log(names[1] + ' played with explosives ', suicidetype)}
}