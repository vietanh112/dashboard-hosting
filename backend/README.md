# DB migrate
RUN `cd modules`
RUN `npx sequelize-cli db:migrate --config=../configs/config.json`

# DB seed
RUN `npx sequelize-cli db:seed:all --config ../configs/config.json`