module.exports = (sequelize, Sequelize) => {
  const { DataTypes, Model } = Sequelize;

  class MMSend extends Model {}
  MMSend.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      senderNumber: { type: DataTypes.STRING(20), allowNull: false },
      amount: {
        type: DataTypes.DECIMAL(19, 4),
        allowNull: false,
        get() {
          // Workaround until sequelize issue #8019 is fixed
          const value = this.getDataValue("amount");
          // return value === null ? null : parseFloat(value);
          return value === null ? null : parseInt(value);
        },
      },
      currencyCode: {
        type: DataTypes.STRING(3),
        defaultValue: "UGX",
        allowNull: false,
      },
      reason: { type: DataTypes.STRING, allowNull: false },
      reference: { type: DataTypes.UUID, allowNull: false, unique: true },
      serviceFee: {
        type: DataTypes.DECIMAL(19, 4),
        allowNull: false,
        get() {
          // Workaround until sequelize issue #8019 is fixed
          const value = this.getDataValue("serviceFee");
          // return value === null ? null : parseFloat(value);
          return value === null ? null : parseInt(value);
        },
      },
      status: {
        type: DataTypes.ENUM([
          "pending",
          "processing",
          "success",
          "failed",
          "terminated",
          "processed",
        ]),
        allowNull: false,
        defaultValue: "pending",
      },
      statusMessage: { type: DataTypes.STRING },
      // receiverId: {},
    },
    { sequelize, modelName: "mm_send" }
  );

  return MMSend;
};
