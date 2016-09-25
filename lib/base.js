// base.js

// Base functions for rustBot
//discord bot load and initialize
const convert = require('./colorHex');
const config = require('./../config.js');
const Discord = require("discord.js");
const dateFormat  = require("dateformat");
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
    var file = "logs/" + file
    // lets convert any old type (numbers 1-3) into the new type of a string
    var numberCh    = RegExp(/\d/)
    if(numberCh.test(type)){
        if(type==1){type='l'}
        if(type==2){type='lc'}
        if(type==3){type='lcr'}
    }
    // use digits for detection of type, move to if statement 
    var logDiscord  = new RegExp(/d/)
    var logRcon     = new RegExp(/r/)
    var logConsole  = new RegExp(/c/)
    var logLog      = new RegExp(/l/)

    // check if text is an array for colorizing text

    if (Array.isArray(msg)){
        // msg = 'array log to console'
        plMsg = ''
        for (var i = 0, len = msg.length; i < len; i++) {
            msg[i].text = msg[i].text.trim()
            plMsg = plMsg + msg[i].text + ' '
        }
        colorMsg = colorizeText(msg)
        msg = plMsg
        // console.log(colorMsg)
    }
    

    var rightNow = new Date();
    var date = dateFormat(rightNow, "[yy-mm-dd hh:MM:ss]");
    // if(type>1){process.stdout.write(file)}
    //log file, should already be created
    if(logLog.test(type)){fs.appendFile(file, date + ' ' + msg + '\n');}
    if(logConsole.test(type)){process.stdout.write(date + ' ' + msg + '\n');}
    if(rconEnabled == 1){
        if(colorMsg && logRcon.test(type)) {rcon.Command('say ' + colorMsg);}
        else if(logRcon.test(type)){rcon.Command('say ' + msg);}
    }
    
    if(logDiscord.test(type) && discordEnabled == 1){discordMessage(msg)}
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

colorizeText = function (a){
    var finalText = ''
    for (var i = 0, len = a.length; i < len; i++) {
        a[i].text = a[i].text.trim()
        a[i].color = a[i].color.trim()
        a[i].color = convert.colorHex(a[i].color)
        a[i].color = '<color=' + a[i].color + '>'
        a[i].text = a[i].text + '</color> '
        finalText = finalText + a[i].color + a[i].text;
    }

    return finalText;
}


module.exports = {
  log: log,
  RconService: RconService,
  discordMessage: discordMessage
}