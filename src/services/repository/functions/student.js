module.exports = (models, sequelize) => {
  const { Student } = models;

  async function addStudent({name, schoolId, cardId}) {
    return await Student.create({name, schoolId, cardId});
  }

  return {
    addStudent,
  };
};
