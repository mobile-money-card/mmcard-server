module.exports = (sequelize, Sequelize) => {
  const { DataTypes, Model } = Sequelize;

  class EasypayCallback extends Model {}
  EasypayCallback.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      response: { type: DataTypes.TEXT, allowNull: false },
    },
    { sequelize, modelName: "card" }
  );

  return EasypayCallback;
};