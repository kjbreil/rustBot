// base.js

// Base functions for rustBot
//discord bot load and initialize
const config = require('./../config.js')
const Discord = require("discord.js");



const fs = require("fs");

//##################################################//
//						Logger						//
//##################################################//

//Type 0 is do nothing, type 1 is log to file, type 2 is 
//log to console and type 3 is log to rcon. They are stacking
//so type 3 will be logged to file and console in addition to rcon
log = function (msg, type, file) {
    //check if file is null or assign default
    if(file == null){file = "rustbot.log"};
    file = "logs/" + file
	//rustify the date
    var date = new Date().toISOString()
                            .toLocaleString()
                            .replace(/T/, ' ')
                            .replace(/\..+/, '');

    // [2016-09-22 21:16:10]
    var rn = new Date()
    var yr = rn.getFullYear()
    var mt = rn.getMonth()
    var dy = rn.getDay()
    var hr = rn.getHours()
    var mn = rn.getMinutes()
    var se = rn.getSeconds()
    var date = '[' + yr + '-' + mt + '-' + dy + ' ' + hr + ':' + mn + ':' + se + ']'
    //

    var text = msg;

    // if(type>1){process.stdout.write(file)}
    //log file, should already be created
    if(type>0){fs.appendFile(file, date + ' ' + text + '\n');}
    if(type>1){process.stdout.write(date + ' ' + text + '\n');}
    // type 3 so if(type>3) is going to be rcon leaving one other
    if(type>2){rcon.Command('say ' + text);}
    file = null
}

RconService = function (rconData) {
	var me = this;
	//use websocket, since the library is only used here should this be its own library?
    var WebSocket = require('ws');
    
    var States = {
        eCLOSED:0,
        eOPENED:1,
        eCONNECTING:2
    };
    
    this.rconData = rconData;
    
    this.state = States.eCLOSED;
    this.identifier = 1;
    this.listeners = {};
    this.commandQueue = [];
    
    this.isConnected = function() {
        return this.state == States.eOPENED;
    }
    
	this.Connect = function() {
        if(this.state != States.eCLOSED)
            return;
        
        log("Connecting", 2);
        
        this.state = States.eCONNECTING;
        
		this.ws = new WebSocket("ws://" + config.addr + ":" + config.port + "/" + config.pass);
		
        this.ws.on('open', function () {
            log("Connected",2);
            me.state = States.eOPENED;
            while(command = me.commandQueue.shift()) {
                me.Command(command.msg, command.callBack)
            }
        });
        
        this.ws.on('close', function () {
            if(me.rconData.noRetry) {
                log("Disconnected", 2);
                process.exit(1);
            } else {
                log("Disconnected, retrying in 2s", 2);
                me.state = States.eCLOSED;
                setTimeout(function() { me.Connect() }, 2000);
            }
        });
        
		this.ws.on('message', function (data, flags) {
			me.OnMessage( JSON.parse( data ) );
		});
        
        this.ws.on('error', function (err) {
            if(me.rconData.noRetry) {
                log(err, 2);
                process.exit(1);
            } else {
                log(err+" retrying in 10s", 2);
                me.state = States.eCLOSED;
                setTimeout(function() { me.Connect() }, 10000);
            }
        });
	};
	
	this.Command = function(msg, callBack) {
        
        if(this.state == States.eCLOSED)
            this.Connect();
        
        if(this.state == States.eOPENED) {
            var packet = {
                    Identifier: this.identifier,
                    Message: msg,
                    Type: "3"
                };
            
            if(callBack != null)
                this.listeners[this.identifier] = callBack
            
            this.identifier += 1;
            if(this.identifier >= 256)
                this.identifier = 1;
        
            this.ws.send( JSON.stringify( packet ) );
        } else {
            this.commandQueue.push({msg:msg, callBack:callBack});
        }
	};
    
    this.OnMessage = function(data) {
        if(data.Identifier in me.listeners && me.listeners[data.Identifier] != null) {
            me.listeners[data.Identifier](data.Message);
            me.listeners[data.Identifier] = null;
        } else if(this.defaultListener != null) {
            this.defaultListener(data.Message);
        }
    };
}

discordMessage = function(msg){
    // chanAr = bot.channels.array()    
    bot.channels.get(bot.channels.first().id).sendMessage(msg);
}




module.exports = {
  log: log,
  RconService: RconService,
  discordMessage: discordMessage
}