#!/bin/bash
psql -h db -U rustbot -d rustbot -f rustBot.sql
npm install
node ./app.js

# Sleep for 10 seconds so that we don't just restart over and over when rcon is down
sleep 10s
