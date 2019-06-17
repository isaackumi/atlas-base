#!/bin/bash
pm2-dev start --interpreter ./node_modules/.bin/babel-node ./src/server.js
pm2-dev logs
