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

            deleteMessage(message)
            return;
		default:
			// deleteMessage(message)
	}

	// console.log(line.channel.name)
}

discordMessage = function(msg, pChannel){ 
    let datetime = dateFormat(new Date(), "[mm-dd-yy hh:MM:ss] ")
    let time = dateFormat(new Date(), '[HH:MM:ss] ')

    channel = bot.channels.find('name', pChannel)
    switch (pChannel){
        case (config.discordRooms.log):
            channel.sendMessage(datetime + msg)
            break;
        case (config.discordRooms.bot):
            channel.sendMessage(datetime + msg)
            break;
        default:
            channel.sendMessage(time + msg)
    }
}

rconCommands = function(command) {
    messageCommand = new RegExp(/^(\S*)/).exec(command)[1]
    messageArgsRE = new RegExp(/^(\S*) (.*)$/) //.exec(command)[2]
    if(mA = messageArgsRE.exec(command)) {messageArgs = mA[2]}
    helpMessage = rconHelp(cA.rconCommands)
    cA.rconCommands[0].discord = helpMessage
    if (co = cA.rconCommands.find(findCommand)) {
    	if (rc = co.rcon) {
            // base.log(a, 'lcd', null, config.discordRooms.bot)
            if(rc === 'giveallCommand()') {giveallCommand(messageArgs, command)}
            else if(rc === 'giveCommand()') {giveCommand(messageArgs, command)}
            else if(rc === 'global.playerlist') {listPlayers()}
            else if(co.cb) {rcon.Command(rc, co.cb)}
            else {rcon.Command(rc)}
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
                        discordDeleteAllMessages(config.discordRooms.rcon)
                        break;
                    // case(config.discordRooms.chat):
                    //  base.discordDeleteAllMessages(config.discordRooms.chat)
                    //  break;
                    case(config.discordRooms.bot):
                        discordDeleteAllMessages(config.discordRooms.bot)
                        break;
                    case(config.discordRooms.default):
                        discordDeleteAllMessages(config.discordRooms.default)
                        break;
                    case(config.discordRooms.log):
                        discordDeleteAllMessages(config.discordRooms.log)
                        break;
                    default:
                        base.log('Channel outside context of current bot', 'lcd', 'rustbot.log', config.discordRooms.bot)
                        break;
                }
                // base.log('discordDeleteMessage()', 'lcd', 'rustbot.log', config.discordRooms.rcon)
                break;
            case ('discordDeleteMessageType()'):
                switch (messageArgs){
                    case('r'):
                        // console.log('not broken')
                        let RE = new RegExp(/^.+ RCON /)
                        discordDeleteMessageType(config.discordRooms.bot, RE)
                        break;
                    case('lp'):
                        let plRE = new RegExp(/^.+ \[\*\*\d+\*\*\]\[\*\*\*lp\*\*\*\]/)
                        discordDeleteMessageType(config.discordRooms.rcon, plRE)
                        break;
                    default:
                        // base.log('why you do that?', 'lcd', 'rustbot.log', config.discordRooms.bot)
                        break;
                }
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
    setTimeout(function () {
        message.delete()
            .then(msg => base.log(`${msg} by ${msg.author.username} deleted from ${msg.channel.name}`, 'lc', 'discord.log'))
            .catch(base.log('Delete message failed'), 'lc', 'discord.log');
    }, 250); 
    
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
    h = h + '\n[ __signal__ : *supply signal* : 1 ]'
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
    rcon.Command('global.playerlist', 'displayPlayers.discordDisplayPlayers')
}

serverGive = function(items, u, m, si) {
    console.log(si)
    console.log(playersConnected)
    setTimeout(function () {
        if((pc = playersConnected) && (pq = playersQueued) && (pj = playersJoining)) {
            if (pc == 1 && pq == 0 && pj == 0){
                base.log('[**GIVE** : ' + u.author.username + ' : ' + si + ' : __' + m + '__ ]', 'lcd', 'rcon.log', config.discordRooms.log)
                base.log('Starting the Give', 'lc', null, config.discordRooms.rcon)
                for (let i in items){
                    rcon.Command('giveto ' + si + ' ' + items[i].item + ' ' + items[i].qty)
                }
            } else {
                base.log('[**GIVE**] NOT POSSIBLE DUE TO TOO MANY PLAYERS CONNECTED/JOINING', 'lcd', 'rcon.log', config.discordRooms.log)
            }
            return;
        } else {
            serverGive(items, u, m, si)
            return;
        }
    }, 250); 
    

    base.log('[**GIVE** : ' + u.author.username + ' : __' + m + '__ ]', 'lcd', 'rcon.log', config.discordRooms.log)
    base.log('Starting the Give', 'lc', null, config.discordRooms.rcon)
    for (let i in items){
        // console.log('giveall ' + items[i].item + ' ' + items[i].qty)
        rcon.Command('give ' + items[i].item + ' ' + items[i].qty)
    }
}

checkStatus = function() {
    playersConnected = null
    playersQueued = null
    playersJoining = null
    rcon.Command('status', rconResponse.returnStatus)
}

giveCommand = function(m, u) {
    // let RE = new RegExp(/^(\d{17}) +(.+)/)
    let split = RegExp(/^(\d{17}) +(.+)/).exec(m)
    if (split === null){return}
    let steamid = split[1]
    let kit = split[2]
    switch (kit){
        // case('help'):
        //     giveHelp()
        //     break;
        case('resources'):
            checkStatus()
            serverGive(itemSets.resources, u, kit, steamid)
            break;
        case('craftweap'):
            checkStatus()
            serverGive(itemSets.craftweap, u, kit, steamid)
            break;
        // case('c4'):
        //     checkStatus()
        //     serverGive(itemSets.c4, u, kit, steamid)
        //     break;
        default:
            base.log(m + ' is not a found give set', 'lcd', 'rustbot.log', config.discordRooms.rcon)
            break;
    }
}

serverGiveAll = function(items, u, m) {
    base.log('[**GIVEALL** : ' + u.author.username + ' : __' + m + '__ ]', 'lcd', 'rcon.log', config.discordRooms.log)
    base.log('Starting the Give', 'lc', null, config.discordRooms.rcon)
    for (let i in items){
        // console.log('giveall ' + items[i].item + ' ' + items[i].qty)
        rcon.Command('giveall ' + items[i].item + ' ' + items[i].qty)
    }
}

giveallCommand = function(m, u) {

    switch (m){
        case('help'):
            giveHelp()
            break;
        case('kit'):
            serverGiveAll(itemSets.armor, u, m)
            break;
        case('c4'):
            serverGiveAll(itemSets.c4, u, m)
            break;
        case('signal'):
            serverGiveAll(itemSets.signal, u, m)
            break;
        case('m249'):
            serverGiveAll(itemSets.m249, u, m)
            break;
        case('lr300'):
            serverGiveAll(itemSets.lr300, u, m)
            break;
        default:
            base.log(m + ' is not a found give set', 'lcd', 'rustbot.log', config.discordRooms.rcon)
            break;
    }
}

discordDeleteAllMessages = function(channel) {
    channel = bot.channels.find('name', channel)
    channel.sendMessage('Gonna delete some stuff')
    channel.fetchMessages({limit : 100}).then(function (m) {
        channel.bulkDelete(m)
    }).catch(function (err) {
        console.log('## ' + err);
    });
}


discordDeleteMessageType = function(channel, type) {
    return new Promise(function (resolve, reject) {
        channel = bot.channels.find('name', channel)
        channel.fetchMessages({limit : 100}).then(function (m) {
            filteredMessages = m.filter(findMessage.bind(this, type))
            filteredMessages.deleteAll()
            resolve()
        }).catch(function (err) {
            console.log('## ' + err);
        });
    });
}

findMessage = function(r, f) { 
    // return function (f)
    // content: '[10-05-16 11:43:28] RCON Connected',
    // let RE = new RegExp(/^.+ RCON /)
    if(r.test(f.content)) {return f}
}