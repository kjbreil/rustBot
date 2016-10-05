// discordRcon.js

const itemSets = require('./itemSets.js')
const cA = require('./commands.js')

exports.messageArgs = ''



exports.discordRcon = function (message) {
	if(message.author.id == config.discordID) {return;}
	switch (message.channel.name) {
		case (config.discordRooms.bot):
            botCommands(message)
			deleteMessage(message)
			return;
		case (config.discordRooms.chat):
			base.log(message.author.username + ': ' + message.content, 'lcr', 'rcon.log', config.discordRooms.bot)
			deleteMessage(message)
			return;
		case (config.discordRooms.rcon):
			rconCommands(message)
			return;
		case (config.discordRooms.general):
			deleteMessage(message)
			return;
		default:
			// deleteMessage(message)
	}

	// console.log(line.channel.name)
}

rconCommands = function(command) {
    messageCommand = new RegExp(/^(\S*)/).exec(command)[1]
    messageArgsRE = new RegExp(/^(\S*) (.*)$/) //.exec(command)[2]
    if(mA = messageArgsRE.exec(command)) {messageArgs = mA[2]}
    helpMessage = rconHelp(cA.rconCommands)
    cA.rconCommands[0].discord = helpMessage
    if (cA.rconCommands.find(findCommand)) {
    	if (a = cA.rconCommands.find(findCommand).rcon) {
            // base.log(a, 'lcd', null, config.discordRooms.bot)
            if(a === 'giveCommand()') {giveCommand(messageArgs, command)}
            if(a === 'global.playerlist') {listPlayers()}
            else {rcon.Command(cA.rconCommands.find(findCommand).rcon)}
            // 
        }
    	if (cA.rconCommands.find(findCommand).discord){base.log(cA.rconCommands.find(findCommand).discord, 'd', null , config.discordRooms.rcon)}
    	deleteMessage(command)
    }
    else {deleteMessage(command)};
}

botCommands = function(command){
    messageCommand = new RegExp(/^(\S*)/).exec(command)[1]
    messageArgsRE = new RegExp(/^(\S*) (.*)$/) //.exec(command)[2]
    messageArgs = ''
    if(mA = messageArgsRE.exec(command)) {messageArgs = mA[2]}
    if (a = cA.botCommands.find(findCommand)) {
        switch (cA.botCommands.find(findCommand).fcmd) {
            case ('discordDeleteAllMessages()'):
                switch (messageArgs){
                    case(config.discordRooms.rcon):
                        base.discordDeleteAllMessages(config.discordRooms.rcon)
                        break;
                    // case(config.discordRooms.chat):
                    //  base.discordDeleteAllMessages(config.discordRooms.chat)
                    //  break;
                    case(config.discordRooms.bot):
                    console.log('working here')
                        base.discordDeleteAllMessages(config.discordRooms.bot)
                        break;
                    case(config.discordRooms.default):
                        base.discordDeleteAllMessages(config.discordRooms.default)
                        break;
                    default:
                        base.log('Channel outside context of current bot', 'lcd', 'rustbot.log', config.discordRooms.bot)
                        break;
                }
                // base.log('discordDeleteMessage()', 'lcd', 'rustbot.log', config.discordRooms.rcon)
                break;
            case ('discordDeleteMessageType()'):
                switch (messageArgs){
                    case('t'):
                        base.discordDeleteMessageType(config.discordRooms.bot, 'fps')
                        break;
                    default:
                        base.log('why you do that?', 'lcd', 'rustbot.log', config.discordRooms.bot)
                        break;
                }
                break;
            case ('serverGive()'):
                giveCommand(messageArgs)
                break;
            case undefined:
                break;
            default:
                break;
        }
    }
    // cA.botCommands
    
}

deleteMessage = function(message) {
    message.delete()
        .then(msg => base.log(`${msg} by ${msg.author.username} deleted from ${msg.channel.name}`, 'lc', 'discord.log'))
        .catch(base.log('Delete message failed'), 'lc', 'discord.log');
}

rconHelp = function(a) {
    h = '[**HELP**]'
    for (var i in a) {
        if (a[i].scmd) {h = h + '[ __' + a[i].cmd + '__ : *' + a[i].help + '* : ***' + a[i].scmd + '***]'}
        else if (a[i].help) {h = h + '[ __' + a[i].cmd + '__ : *' + a[i].help + '* ]'}
        // console.log(h)
    }
    return h;
}

giveHelp = function() {
    h = '[**GIVE HELP**]'
    h = h + '\n[ __kit__ : *armor, ammo, gun* : 1, 100, 1 ]'
    h = h + '\n[ __c4__ : *timed explosives* : 10 ]'
    h = h + '\n[ __signal__ : *supply signal* : 5 ]'
    h = h + '\n[ __m249__ : *m249, explosive ammo* : 1, 100 ]'
    h = h + '\n[ __lr300__ : *lr300, explosive ammo* : 1, 100 ]'
    base.log(h, 'd', null, config.discordRooms.rcon)
    return;
}

findCommand = function(f) { 
    messageCommand = messageCommand.toLowerCase()
    return (f.cmd === messageCommand || f.scmd === messageCommand);
}

listPlayers = function() {
    playerListWait = null
    rcon.Command('global.playerlist')
    setTimeout(function(){
        if (playerListWait) {}
        else {base.log('[**0**][***lp***][DisplayName : SteamID : Ping]', 'lcd', 'rustbot.log', config.discordRooms.rcon)}
    },2000);
}

serverGive = function(items) {
    base.log('Starting the Give', 'lc', null, config.discordRooms.rcon)
    for (let i in items){
        // console.log('giveall ' + items[i].item + ' ' + items[i].qty)
        rcon.Command('giveall ' + items[i].item + ' ' + items[i].qty)
    }
}

giveCommand = function(m, u) {
    base.log(u.author.username + ' gave ' + m, 'lcd', 'rustbot.log', config.discordRooms.rcon)
    switch (m){
        case('help'):
            giveHelp()
            break;
        case('kit'):
            serverGive(itemSets.armor)
            break;
        case('c4'):
            serverGive(itemSets.c4)
            break;
        default:
            base.log(m + ' is not a found give set', 'lcd', 'rustbot.log', config.discordRooms.rcon)
            break;
    }
}