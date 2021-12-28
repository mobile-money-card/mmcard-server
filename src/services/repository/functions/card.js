module.exports = (models, sequelize) => {
  const { Card, Student } = models;

  async function findCardByCardNumber(cardNumber) {
    return await Card.findOne({ where: { cardNumber }, include: Student });
  }

  async function getAllCards() {
    return await Card.findAll({ include: Student });
  }

  return {
    findCardByCardNumber,
    getAllCards
  };
};
