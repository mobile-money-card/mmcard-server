const path = require("path");
const { Sequelize } = require("sequelize");

// const sequelize = new Sequelize(process.env.POSTGRESQL_CONNECTION_STRING, {
//   define: { freezeTableName: true, underscored: true },
//   logging: false,
// });

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.join(__dirname, "..", "..", "..", "development", "database.sqlite3"),
  define: { freezeTableName: true, underscored: true },
  logging: false
});

const Admin = require("./models/admin")(sequelize, Sequelize);
const Card = require("./models/card")(sequelize, Sequelize);
const MMAgent = require("./models/mm-agent")(sequelize, Sequelize);
const MMSend = require("./models/mm-send")(sequelize, Sequelize);
const RegistrationAgent = require("./models/registration-agent")(
  sequelize,
  Sequelize
);
const School = require("./models/school")(sequelize, Sequelize);
const Student = require("./models/student")(sequelize, Sequelize);
const EasypayCallback = require("./models/easypay-callback")(sequelize, Sequelize);

const models = {
  Admin,
  Card,
  MMAgent,
  MMSend,
  RegistrationAgent,
  School,
  Student,
  EasypayCallback
};

require("./associations")(models);

module.exports = {
  sequelize,
  Sequelize,
  ...models,
};
