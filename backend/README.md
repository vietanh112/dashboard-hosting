## Install node_modules
RUN `npm install`

# Copy Config
## env
RUN `cp .env.example .env`

## configs
RUN `cp -r configs_example configs`

# DB migrate
RUN `cd modules`
RUN `npx sequelize-cli db:migrate --config=../configs/config.json`

# DB seed
RUN `npx sequelize-cli db:seed:all --config ../configs/config.json`

# Run
RUN `nodemon server.js`