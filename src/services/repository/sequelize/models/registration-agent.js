module.exports = (sequelize, Sequelize) => {
  const { DataTypes, Model } = Sequelize;
  
  class RegistrationAgent extends Model {}
  RegistrationAgent.init(
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
    { sequelize, modelName: "registration_agent" }
  );


  return RegistrationAgent;
};
