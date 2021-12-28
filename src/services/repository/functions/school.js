module.exports = (models, sequelize) => {
  const {School} = models;

  async function getAllSchools() {
    return await School.findAll({attributes: ["id", "name"]});
  }

  return {
    getAllSchools
  }

}