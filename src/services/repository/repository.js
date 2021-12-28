const { sequelize, Sequelize, ...models } = require("./sequelize/sequelize");
const functions = require("./functions/functions");
const {
  admin,
  card,
  mmAgent,
  mmSend,
  registrationAgent,
  school,
  student,
  easypayCallback,
} = functions(models, sequelize);

async function run() {
  // await sequelize.authenticate();
  await sequelize.sync();
  return {
    ...admin,
    ...card,
    ...mmAgent,
    ...mmSend,
    ...registrationAgent,
    ...school,
    ...student,
    ...easypayCallback,
  };
}

const repo = run();

const repository = async () => {
  return await repo;
};

module.exports = repository;
