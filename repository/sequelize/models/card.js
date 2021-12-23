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

class Card extends Model {}
Card.init(
  {
    id: {type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true},
    cardNumber: { type: DataTypes.STRING(100), allowNull: false },
    pin: {type: DataTypes.STRING(100), allowNull: false}
    // student id
  },
  { sequelize, modelName: "card" }
);

