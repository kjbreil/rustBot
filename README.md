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

Requirments:
* node.js
* rust server (duh)

Version 1 Goals:
* Kill Feed
* Pure chat log
* Chat responsiveness
	* Read from chat and send messages and/or run commands
* Basic discord integration

Version 2 Goals:
* SQL(MongoDB?) integration
* One time use codes
* More advanced discord integration
