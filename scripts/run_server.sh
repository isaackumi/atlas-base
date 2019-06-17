#!/bin/bash
pm2 start --interpreter ./node_modules/.bin/babel-node ./src/server.js --watch 
pm2 logs