## Install node_modules
RUN `npm install`

# DB migrate
RUN `cd modules`
RUN `npx sequelize-cli db:migrate --config=../configs/config.json`

# DB seed
RUN `npx sequelize-cli db:seed:all --config ../configs/config.json`

# Run
RUN `nodemon server.js`