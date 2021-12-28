module.exports = (sequelize, Sequelize) => {
  const { DataTypes, Model } = Sequelize;

  class School extends Model {}
  School.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: { type: DataTypes.STRING(100), allowNull: false, unique: true },
      levelOfEducation: {
        type: DataTypes.ARRAY(
          DataTypes.ENUM(["Primary", "O'Level", "A'Level"])
        ),
        allowNull: false
      },
      location: { type: DataTypes.STRING(100), allowNull: false },
    },
    { sequelize, modelName: "school" }
  );

  return School;
};
