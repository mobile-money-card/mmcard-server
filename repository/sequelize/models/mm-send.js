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

class MMSend extends Model {}
MMSend.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    senderNumber: { type: DataTypes.STRING(20), allowNull: false },
    // receiverId: {},
    amount: { type: DataTypes.DECIMAL(19, 4), allowNull: false },
    currencyCode: {
      type: DataTypes.STRING(3),
      defaultValue: "UGX",
      allowNull: false,
    },
    reason: { type: DataTypes.STRING, allowNull: false },
    reference: { type: DataTypes.UUID, allowNull: false },
    serviceFee: { type: DataTypes.DECIMAL(19, 4), allowNull: false },
    status: {
      type: DataTypes.ENUM(["pending", "success", "failed"]),
      allowNull: false,
    },
    statusMessage: { type: DataTypes.STRING },
  },
  { sequelize, modelName: "mm_send" }
);
