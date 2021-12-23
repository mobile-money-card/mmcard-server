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
      pin: { type: DataTypes.STRING(100), allowNull: false },
      // student id
    },
    { sequelize, modelName: "card" }
  );

  return Card;
};
