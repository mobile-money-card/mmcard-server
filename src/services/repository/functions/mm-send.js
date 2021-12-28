const uuid = require("uuid");

module.exports = (models, sequelize) => {
  const { MMSend } = models;

  async function addMMSend({
    senderNumber,
    amount,
    reason,
    reference,
    serviceFee,
    receiverId,
  }) {
    return await MMSend.create({
      senderNumber,
      amount,
      reason,
      reference,
      serviceFee,
      receiverId,
    });
  }

  async function updateMMSendStatusById({ id, status }) {
    return await MMSend.update({ status }, { where: { id } });
  }

  async function updateMMSendStatusByReference({ reference, status }) {
    return await MMSend.update({ status }, { where: { reference } });
  }

  return {
    addMMSend,
    updateMMSendStatusById,
    updateMMSendStatusByReference,
  };
};
