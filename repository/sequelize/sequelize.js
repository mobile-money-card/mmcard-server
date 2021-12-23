const path = require("path");
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  {
    dialect: "sqlite",
    storage: path.join(
      __dirname,
      "..",
      "..",
      "development",
      "database.sqlite3"
    ),
    define: { freezeTableName: true, underscored: true} ,
  },
);

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

module.exports = {
  sequelize,
  Sequelize,
  Admin,
  Card,
  MMAgent,
  MMSend,
  RegistrationAgent,
  School,
  Student,
};
