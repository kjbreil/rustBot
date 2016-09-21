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

exports.deathMessageIF = function (line) {
	//pvp kills, the exec uses the regex to extract and assign names to message
	if(names = pvpRE.exec(line)) {
		pvp(line, names)
	}
	//NPC characters, I beleive modded only so will add at a later date
	else if(npcRE.test(line)) {
		base.log('npcRE', 1)
		base.log(line, 1)
	}
	else if(names = death1RE.exec(line)) {
		death1(line, names)
	}
	else if(names = death2RE.exec(line)) {
		death2(line, names)
	}
}

//nothing special yet, will add if/then to do special messages for certain players
function pvp(line, names){
	base.log(names[1] + ' killed ' + names[2], 2)
	base.log(line, 1)
}

function death1(line, names) {
	var death1type = 1
	var reason = names[2].toLowerCase()
	if(reason == 'generic')			{base.log(names[1] + ' died genericly', 1)}
	else if (reason == 'cold')		{base.log(names[1] + ' succumbed to the cold', death1type);}
	else if (reason == 'bleeding')	{base.log(names[1] + ' bled out', death1type);}
	else if (reason == 'heat')		{base.log(names[1] + ' was just too hot for this world', death1type);}
	else if (reason == 'suicide')	{base.log(names[1] + ' was done with with world and ended it', death1type);}
	else if (reason == 'slash')		{base.log(names[1] + ' succumbed to a slash wound and died', death1type);}
	else if (reason == 'hunger')	{base.log(names[1] + ' was hungers, is now dead', death1type);}
	else if (reason == 'bite')		{base.log(names[1] + ' should\'ve bit back', death1type);}
	else if (reason == 'fall')		{base.log(names[1] + ' tried to fly but faceplanted into the ground', death1type);}
	else if (reason == 'drowned')	{base.log(names[1] + ' went for a swim and never came back', death1type);}
	else 							{base.log('DNF ' + names[1] + '|' + names[2] + '|' + line, 1)}
}

function death2(line, names) {
	var death2type = 1
	var reason = names[2].toLowerCase();
	if(reason == 'bear')					{base.log(names[1] + ' was mauled by a bear', death2type);}
	else if(reason == 'wolf')				{base.log(names[1] + ' was eaten by a wolf', death2type);}
	else if(reason == 'poison')				{base.log(names[1] + ' ate some bad food and died from food poisoning', death2type);}
	else if(reason == 'wall')				{base.log(names[1] + ' was trying to jump over a wall, it didn\'t work', death2type);}
	else if(reason == 'drowned')			{base.log(names[1] + ' went for a swim and never came back', death2type);}
	else if(reason == 'autoturret_deployed'){base.log(names[1] + ' got blasted by an autoturret', death2type);}
	else if(reason == 'patrolhelicopter')	{base.log(names[1] + ' thought he would fight the heli, the heli won', death2type);}
	else if(reason == 'landmine')			{base.log(names[1] + ' stepped on a landmine', death2type);}
	else if(reason == 'cactus')				{base.log(names[1] + ' tried having sex with a cactus and bled to death', death2type);}
	else if(reason == 'cold')				{base.log(names[1] + ' froze to death', death2type);}
	else if(reason == 'hunger')				{base.log(names[1] + ' forgot to eat', death2type);}
	else if(reason == 'blunt')				{base.log(names[1] + ' was smoking a blunt and died', death2type);}
	else if(reason == 'barricade')			{base.log(names[1] + ' died by barricade, wtf', death2type);}
	else 									{base.log('DNF ' + names[1] + '|' + names[2] + '|' + line, 1)}
	base.log(line, 1)
}