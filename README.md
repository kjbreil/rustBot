######################################################################
#   __   _  _  ____  ____   __   _  _  ____  __     __   __ _  ____  #
#  / _\ / )( \(  __)/ ___) /  \ ( \/ )(  __)(  )   / _\ (  ( \(    \ #
# /    \\ /\ / ) _) \___ \(  O )/ \/ \ ) _) / (_/\/    \/    / ) D ( #
# \_/\_/(_/\_)(____)(____/ \__/ \_)(_/(____)\____/\_/\_/\_)__)(____/ #
#    ____  ____   __  ____  _  _   ___  ____  __  __   __ _  ____    #
#   (  _ \(  _ \ /  \(    \/ )( \ / __)(_  _)(  )/  \ (  ( \/ ___)   #
#    ) __/ )   /(  O )) D () \/ (( (__   )(   )((  O )/    /\___ \   #
#   (__)  (__\_) \__/(____/\____/ \___) (__) (__)\__/ \_)__)(____/   #
#                                                                    #
######################################################################
                                  _   ____        _   
                                 | | |  _ \      | |  
                   _ __ _   _ ___| |_| |_) | ___ | |_ 
                  | '__| | | / __| __|  _ < / _ \| __|
                  | |  | |_| \__ \ |_| |_) | (_) | |_ 
                  |_|   \__,_|___/\__|____/ \___/ \__|
                                                      

node.js command line tool to interact with rust servers automagically

Big thanks to H3bu$ for his plugin @ http://oxidemod.org/resources/nodejs-rcon-kill-feed.1852/
Thats the plugin that gave me the idea and much of the code for connecting to RCON and couple other things

Right now its a work in progress, if you can figure out how to use then GREAT but otherwise I'm not supporting this yet. I want it to be version 1 feature complete before releasing info on how to use.

Requirments:
-node.js
-rust server (duh)

Version 1 Goals: 
-Kill Feed
-Pure chat log
-Chat responsiveness
	=Read from chat and send messages and/or run commands

Version 2 Goals:
-SQL(MongoDB?) integration