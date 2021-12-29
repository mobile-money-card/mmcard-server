module.exports = (sequelize, Sequelize) => {
  const { DataTypes, Model } = Sequelize;

  class Student extends Model {}
  Student.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: { type: DataTypes.STRING(100), allowNull: false },
      // email: { type: DataTypes.STRING(100), unique: true },
      accountBalance: {
        type: DataTypes.DECIMAL(19, 4),
        defaultValue: 0,
        get() {
          // Workaround until sequelize issue #8019 is fixed
          const value = this.getDataValue("accountBalance");
          // return value === null ? null : parseFloat(value);
          return value === null ? null : parseInt(value);
        },
      },
      // school id
      // card id
    },
    { sequelize, modelName: "student" }
  );

  return Student;
};
