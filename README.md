                  _   ____        _   
                 | | |  _ \      | |  
   _ __ _   _ ___| |_| |_) | ___ | |_ 
  | '__| | | / __| __|  _ < / _ \| __|
  | |  | |_| \__ \ |_| |_) | (_) | |_ 
  |_|   \__,_|___/\__|____/ \___/ \__|
                                             
       by Otto the Caddy
       awesomeland.org

rustBot is gonna your personal assitant for managing rust servers automagically
This is not going to be a RCON tool but will do much of what RCON tools do in that it will not have the ability to send commands interactivly. 

Big thanks to H3bu$ for his plugin @ http://oxidemod.org/resources/nodejs-rcon-kill-feed.1852/
Thats the plugin that gave me the idea and much of the code for connecting to RCON and couple other things

Right now its a work in progress, if you can figure out how to use then GREAT but otherwise I'm not supporting this yet. I want it to be version 1 feature complete before releasing info on how to use.

Requirements:
* node.js
* discord api key
* steam api key (going away)
* rust server (duh)

Version 1 Goals:
* Kill Feed (with colors)
* Server chat channel
* Basic Automated Responses
* Player management (ban/kick)

Version 2 Goals:
* Better Automated Responses
* Kill Feed response definitions for randomization
* PostgreSQL integration
* Steam integration for stats+
* One time use codes for events/prizes
* Server events (like purge day before wipe)
* full RCON console in Discord

This project is a mess right now, getting cleaned up at the moment.

There is a docker-compose file that spins up a postgres db server and rust experimental server to dev against
```
docker volume create --name rustbotdb
docker volume create --name rustserver
docker-compose up -d
```

Right now start the server with either
```
node app.js
```
```
forever --spinSleepTime 10000 -w --minUptime 10000 --killSignal=SIGUSR2 ./rustBot.js
```