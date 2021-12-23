module.exports = (sequelize, Sequelize) => {
  const { DataTypes, Model } = Sequelize;
  class MMAgent extends Model {}
  MMAgent.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: { type: DataTypes.STRING(100), allowNull: false },
      email: { type: DataTypes.STRING(100), allowNull: false, unique: true },
      password: { type: DataTypes.STRING(100), allowNull: false },
    },
    { sequelize, modelName: "mm_agent" }
  );

  return MMAgent;
};
