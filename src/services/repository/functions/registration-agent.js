module.exports = (models, sequelize) => {
  const { RegistrationAgent } = models;


  async function addRegistrationAgent({name, email, hashedPassword}) {
    return await RegistrationAgent.create({name, email, hashedPassword});
  }

  async function getRegistrationAgentWithEmail(email) {
    return await RegistrationAgent.findOne({ where: { email } });
  }

  return {
    addRegistrationAgent,
    getRegistrationAgentWithEmail
  }
};
