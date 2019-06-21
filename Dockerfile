FROM node:10.13

RUN \
  apt-get -q update && \
  apt-get -q install -y \
    python \
    python-dev \
    python-pip \
    python-virtualenv \
    wget \
    g++ \
    make \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json /app/

RUN npm config set loglevel warn && npm install -g pm2 && npm install

EXPOSE 3000 80

COPY . /app

CMD [ "./scripts/run_server.sh" ]
