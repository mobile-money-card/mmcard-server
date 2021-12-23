const { sequelize } = require("./sequelize/sequelize");

async function run() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("completed");
  } catch (error) {
    console.log("Error: ", error);
  }
}

run();
