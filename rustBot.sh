#!/bin/bash
# npm install
pm2 delete all
pm2 start rustBot.json
pm2 logs