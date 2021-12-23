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

class MMAgent extends Model {}
MMAgent.init(
  {
    id: {type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true},
    name: { type: DataTypes.STRING(100), allowNull: false },
    email: { type: DataTypes.STRING(100), allowNull: false, unique: true },
    password: { type: DataTypes.STRING(100), allowNull: false}
  },
  { sequelize, modelName: "mm_agent" }
);

