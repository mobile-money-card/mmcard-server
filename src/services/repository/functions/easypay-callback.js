module.exports = (models, sequelize) => {
  const { EasypayCallback } = models;

  async function addEasypayCallback({ response }) {
    return await EasypayCallback.create({ response });
  }

  return {
    addEasypayCallback,
  };
};
