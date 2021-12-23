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

class School extends Model {}
School.init(
  {
    id: {type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true},
    name: { type: DataTypes.STRING(100), allowNull: false, unique: true },
    levelOfEducation: {type: DataTypes.ARRAY(DataTypes.ENUM(["Primary", "O'Level", "A'Level"]))},
    location: { type: DataTypes.STRING(100), allowNull: false },
  },
  { sequelize, modelName: "school" }
);

