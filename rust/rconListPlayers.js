// playerList.js

/*
  {
    "SteamID": "76561198024129044",
    "OwnerSteamID": "0",
    "DisplayName": "Herro",
    "Ping": 37,
    "Address": "123.123.321.31:56814",
    "ConnectedSeconds": 463,
    "VoiationLevel": 0.0,
    "CurrentLevel": 4.0,
    "UnspentXp": 5.0,
    "Health": 59.7555847
  }


*/
exports.getAndDisplayPlayers = function() {
    rust.rconListPlayers.getPlayerArray().then(function() {
        discord.discordRconSend.playerList()
    }).catch(function(err) {log(err, 'lc', discordRoom.bot, logFile.info)})
}

exports.getPlayerArray = function() {
    return new Promise(function (resolve, reject) {
        rcon.run('global.playerlist').then(function(msg){
            // log(msg, 'lc', logFile.info, discordRoom.bot)
            msg = JSON.parse(JSON.stringify(msg.message))
            server.refresh.player = new Date().getTime()
            server.players = msg
            cpu.sql.sqlInserters.playerListToSQL(server.players)
            resolve(msg)
        }).catch(function (err) {
            reject(err)
        })
    })
}

exports.getPlayerIsOnline = function(si) {
    // log('inside getPlayerIsOnline function ' + si, 'lc', logFile.info, discordRoom.bot)
    return new Promise(function (resolve, reject) {
        console.log(si)
        console.log('GPI')
        if(typeof server.players == "string") {server.players = JSON.parse(server.players)}


        let out = po.find(findBySteamId.bind(this, si))
        console.log(out)
        log('out ' + out, 'lc', logFile.info, discordRoom.bot)
        resolve(out)
    } )
}


// let commandArray = po.find(onlineCheck.bind(this, si))

findBySteamId = function(si, po) { 
    return (po.SteamID === si )
}




