const uuid = require("uuid");
const { easypayDeposit } = require("../easypay/easypay");
const repository = require("../repository/repository");
const { getServiceFee } = require("./utils");


async function startEasyPayDeposit({ reference, amount, number }) {
  try {
    const repo = await repository();
    const deposit = await easypayDeposit({ reference, amount, number });
    repo.addEasypayCallback({
      response: `EASY PAY DEPOSIT SUCCESS!!!\n${JSON.stringify(deposit)}`,
    });
  } catch (error) {
    repo.addEasypayCallback({
      response: `EASY PAY DEPOSIT ERROR!!!\n${error.message}`,
    });
  }
}

async function sendMobileMoneyToCard({
  senderNumber,
  cardNumber,
  amount,
  reason,
}) {
  const repo = await repository();
  const card = await repo.findCardByCardNumber(cardNumber);

  if (!card || !card.student) {
    throw new Error("invalid card number");
  }

  const reference = uuid.v4();
  const receiverId = card.student.id;
  const serviceFee = getServiceFee(amount);
  const mmSend = await repo.addMMSend({
    senderNumber,
    amount,
    reason,
    reference,
    receiverId,
    serviceFee,
  });

  // startEasyPayDeposit({
  //   reference,
  //   amount: amount + serviceFee,
  //   number: senderNumber,
  // });

  return {
    receiverName: card.student.name,
    reference,
    amount,
    serviceFee,
    // transactionId: mmSend.id,
  };
}


module.exports = {
  sendMobileMoneyToCard,
};
