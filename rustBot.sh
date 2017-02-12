#!/bin/bash
psql -h db -U rustbot -d rustbot -f rustBot.sql
npm install
forever --spinSleepTime 10000 -w --minUptime 10000 --killSignal=SIGUSR2 ./rustBot.js
