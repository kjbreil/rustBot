// deathMessage.js

// Template file for rustBot matchers 

// Set the regex matching, must be same name as file

const base = require("./../lib/base");
// Regex for matcher
deathMessageRE = new RegExp(/^[^[](.+?)\[[0-9]+\/[0-9]+\].*(\w+)/);



pvpRE		= new RegExp(/^(.+?)\[[0-9]+\/[0-9]+\] was killed by (.+?)\[[0-9]+\/[0-9]+\]/);
npcRE		= new RegExp(/^(.+?)\[[0-9]+\/[0-9]+\] was killed by (.+?)\.prefab \((\w+)\)/);
death1RE	= new RegExp(/^(.+?)\[[0-9]+\/[0-9]+\] died \((\w+)\)/);
death2RE	= new RegExp(/^(.+?)\[[0-9]+\/[0-9]+\] was killed by (\w+)/);
suicideRE	= new RegExp(/^(.+?)\[[0-9]+\/[0-9]+\] was suicide by (\w+)/)

exports.deathMessageIF = function (line) {
	//pvp kills, the exec uses the regex to extract and assign names to message
	if(names = pvpRE.exec(line)) {
		pvp(line, names)
	}
	//NPC characters, I beleive modded only so will add at a later date
	else if(npcRE.test(line)) {
		base.log('npcRE', 2)
		base.log(line, 2)
	}
	else if(names = death1RE.exec(line)) {
		death1(line, names)
	}
	else if(names = death2RE.exec(line)) {
		death2(line, names)
	}
	else if(names = suicideRE.exec(line)){
		suicide(line, names)
	}
	else {

	}
}

//nothing special yet, will add if/then to do special messages for certain players
function pvp(line, names){
	var sC = '</color>'
	var color1 = '<color=#4d4dff>'
	var color2 = '<color=#ff9933>'
	base.log('pvp',1)
	base.log(line, 1)
	base.log(color1 + names[2] + sC + ' killed ' + color2 + names[1] + '</color>', 3)
	
}

function death1(line, names) {
	base.log('death1', 1)
	base.log(line, 1)
	var sC = '</color>'
	var color1 = '<color=#4d4dff>'
	var color2 = '<color=#ff9933>'
	var death1type = 3
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
	var death2type = 3
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
	var suicidetype = 3
	var reason = names[2].toLowerCase()
	if(reason == 'explosion')			{base.log(names[1] + ' played with explosives ', suicidetype)}
}