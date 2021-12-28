module.exports = (sequelize, Sequelize) => {
  const { DataTypes, Model } = Sequelize;

  class Admin extends Model {}
  Admin.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: { type: DataTypes.STRING(100), allowNull: false },
      email: { type: DataTypes.STRING(100), allowNull: false, unique: true },
      hashedPassword: { type: DataTypes.STRING(100), allowNull: false },
    },
    { sequelize, modelName: "admin" }
  );

  return Admin;
};
