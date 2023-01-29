FROM node:16.17.0

WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . .

EXPOSE 4001

CMD [ "node", "server.js" ]