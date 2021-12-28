module.exports = (sequelize, Sequelize) => {
  const { DataTypes, Model } = Sequelize;

  class Card extends Model {}
  Card.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      cardNumber: { type: DataTypes.STRING(100), allowNull: false, unique: true, },
      hashedPin: { type: DataTypes.STRING(100), allowNull: false },
    },
    { sequelize, modelName: "card" }
  );

  return Card;
};
