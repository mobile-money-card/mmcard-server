module.exports = ({
  Admin,
  Card,
  MMAgent,
  MMSend,
  RegistrationAgent,
  School,
  Student,
}) => {
  Card.hasOne(Student);
  Student.belongsTo(Card);

  School.hasMany(Student);
  Student.belongsTo(School);

  Student.hasMany(MMSend, {
    foreignKey: "receiverId"
  });
  MMSend.belongsTo(Student, {
    foreignKey: "receiverId"
  });
};
