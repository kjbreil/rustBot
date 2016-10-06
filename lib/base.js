// base.js

// Call other files that are only needed in base
const convert = require('./colorHex');

// The logger - type is a string of letters, one letter to each type of log
// c = console, l = logfile, d = discord, r = rcon
// logfile will default to rustbot.log and discord will default to bot channel
log = function (msg, type, file, channel) {
    //check if file is null or assign default
    let colorMsg = null
    if(file == null){file = "rustbot.log"};
    file = "logs/" + file
    // lets convert any old type (numbers 1-3) into the new type of a string
    let numberCh    = RegExp(/\d/)
    if(numberCh.test(type)){
        if(type==1){type='l'}
        if(type==2){type='lc'}
        if(type==3){type='lcr'}
    }
    // use digits for detection of type, move to if statement 
    let logDiscord  = new RegExp(/d/)
    let logRcon     = new RegExp(/r/)
    let logConsole  = new RegExp(/c/)
    let logLog      = new RegExp(/l/)

    // check if text is an array for colorizing text

    if (Array.isArray(msg)){
        // msg = 'array log to console'
        plMsg = ''
        for (let i = 0, len = msg.length; i < len; i++) {
            msg[i].text = msg[i].text.trim()
            plMsg = plMsg + msg[i].text + ' '
        }
        colorMsg = colorizeText(msg)
        msg = plMsg
        // console.log(colorMsg)
    }
    
    let rightNow = new Date();
    let date = dateFormat(rightNow, "[mm-dd-yy hh:MM:ss]");

    //log file
    if(logLog.test(type)){fs.appendFile(file, date + ' ' + msg + '\n');}
    if(logConsole.test(type)){process.stdout.write(date + ' ' + msg + '\n');}
    if(config.rconEnabled == 1){
        if(colorMsg && logRcon.test(type)) {rcon.Command('say ' + colorMsg);}
        else if(logRcon.test(type)){rcon.Command('say ' + msg);}
    }
    
    if(logDiscord.test(type) && config.discordEnabled == 1 && channel){
        if(logRcon.test(type)) {discordMessage('SERVER: ' + msg, channel)}
        else {discordMessage(msg, channel)}
    }
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
        
        log("RCON Connecting", 'lcd', 'rustbot.log', config.discordRoomsbot);
        
        this.state = States.eCONNECTING;
        
		this.ws = new WebSocket("ws://" + config.addr + ":" + config.port + "/" + config.pass);
		
        this.ws.on('open', function () {
            log("RCON Connected", 'lcd', 'rustbot.log', config.discordRooms.bot);
            me.state = States.eOPENED;
            while(command = me.commandQueue.shift()) {
                me.Command(command.msg, command.callBack)
            }
        });
        
        this.ws.on('close', function () {
            if(me.rconData.noRetry) {
                log("RCON Disconnected", 'lcd', 'rustbot.log', 'bot');
                process.exit(1);
            } else {
                log("RCON Disconnected, retrying in 2s", 'lcd', 'rustbot.log', config.discordRooms.bot);
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
                log(err+" retrying in 1m", 2);
                me.state = States.eCLOSED;
                setTimeout(function() { me.Connect() }, 60000);
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
        base.log(JSON.stringify(data), 'l', 'websocket.log', null)
        if(data.Identifier in me.listeners && me.listeners[data.Identifier] != null) {
            let cb = eval(me.listeners[data.Identifier])
            // console.log(me.listeners[data.Identifier])
            cb(data)
            me.listeners[data.Identifier] = null;
        } else if(this.defaultListener != null) {
            this.defaultListener(data.Message);
        }
    };
}

discordMessage = function(msg){
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

sendRconCommand = function (cmd) {
    rcon.Command(cmd);
}




module.exports = {
  log: log,
  RconService: RconService,
  discordMessage: discordMessage,
  sendRconCommand: sendRconCommand
}