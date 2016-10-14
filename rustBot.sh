#!/bin/bash
npm install
./node_modules/forever/bin/forever --spinSleepTime 10000 -w --minUptime 10000 --killSignal=SIGUSR2 ./rustBot.js
