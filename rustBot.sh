#!/bin/bash

./node_modules/forever/bin/forever --spinSleepTime 20000 -w --minUptime 10000 --killSignal=SIGUSR2 ./rustBot.js
