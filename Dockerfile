FROM node:14

RUN mkdir -p /usr/app 
WORKDIR /usr/app

COPY package.json .
COPY package-lock.json .

RUN npm ci

COPY . .

CMD [ "npm", "run", "start" ]
