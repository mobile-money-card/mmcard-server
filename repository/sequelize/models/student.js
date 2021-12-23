const path = require("path");
const { Sequelize, DataTypes, Model } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.join(
    __dirname,
    "..",
    "..",
    "..",
    "development",
    "database.sqlite3"
  ),
});


class Student extends Model {}
Student.init(
  {
    id: {type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true},
    name: { type: DataTypes.STRING(100), allowNull: false },
    // email: { type: DataTypes.STRING(100), unique: true },
    accountBalance: {type: DataTypes.DECIMAL(19, 4)}
    // school id
    // card id
  },
  { sequelize, modelName: "student" }
);

