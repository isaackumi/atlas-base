#!/bin/bash
set -e

 
#lint
# (cd app && npm install --silent && npm run lint)
 
if [ $NODE_ENV = "development" ]; then
    export DATABASE__URL="process.env.DATABASE__URL"
    export JWT__SECRET_KEY="process.env.JWT__SECRET_KEY" 
    export WEBHOOK__MOSEY_FEED_API_URL="process.env.WEBHOOK__MOSEY_FEED_API_URL"
    export AWS__BUCKET="ampersand-mosey-dev"
    export AWS__SECRET_ACCESS_KEY="process.env.AWS__SECRET_ACCESS_KEY"
    export AWS__BUCKET="process.env.AWS__BUCKET"
    export AWS__QUEUE_URL="com-ampersand-mosey-image-upload-queue"
    export AWS__REGION="us-west-1"
    export TINYPNG__API_KEY="process.env.TINYPNG__API_KEY"
fi
 
