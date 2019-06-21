#!/bin/bash
set -e

<<<<<<< HEAD
#lint
# (cd app && npm install --silent && npm run lint)
=======
if [ $NODE_ENV = "development" ]; then
    export DATABASE__URL="mongodb://mongo:27017/mosey_user_api"
    export JWT__SECRET_KEY="jwt_key_for_token_generation_in_shell" 
    export WEBHOOK__MOSEY_FEED_API_URL="https://mosey-feed-api-test.herokuapp.com/api/v1/store_experience"
    export AWS__BUCKET="ampersand-mosey-dev"
    export AWS__SECRET_ACCESS_KEY="AKIAIK7OOIBJ73HRYJRA"
    export AWS__BUCKET="ampersand-mosey-dev"
    export AWS__QUEUE_URL="com-ampersand-mosey-image-upload-queue"
    export AWS__REGION="us-west-1"
    export TINYPNG__API_KEY="8l6wsRTYg85cWktSmbTZ1XCr9ktH9QNG"
fi

#lint
# (cd app && npm install --silent && npm run lint)

# #test authorize
# (cd app/authorize && npm install --silent && npm test)

# #test interests
# (cd app/interests && npm install --silent && npm test)

# #test experiences
# (cd app/experiences && npm install --silent && npm test)

# #test reviews
# (cd app/reviews && npm install --silent && npm test)

# #test Trip
# (cd app/trips && npm install --silent && npm test)
>>>>>>> a31b1203e7296f08ea04cb571c29a97b8e4bc2ea
