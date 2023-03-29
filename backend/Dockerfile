FROM node:16.17.0

WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install
RUN cp -r .env.example .env
RUN cp -r configs_example configs

ADD . .

EXPOSE 4001

CMD [ "node", "server.js" ]