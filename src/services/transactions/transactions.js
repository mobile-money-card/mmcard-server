const uuid = require("uuid");
const { easypayDeposit } = require("../easypay/easypay");
const repository = require("../repository/repository");
const { getServiceFee } = require("./utils");

async function startEasyPayDeposit({ reference, amount, number }) {
  console.log("startEasyPayDeposit() - starting easy pay deposit: ", {reference, amount, number});
  try {
    const repo = await repository();
    const status = await easypayDeposit({ reference, amount, number });

    await repo.updateMMSendStatusByReference({ reference, status });

    await repo.addEasypayCallback({
      response: `EASY PAY DEPOSIT INITIATE SUCCESS!!!\n${JSON.stringify(
        status
      )}`,
    });
    console.log("startEasyPayDeposit() - finished: ", status);
  } catch (error) {
    console.log("ERROR in startEasyPayDeposit(): ", error.message);
    await repo.updateMMSendStatusByReference({ reference, status:"failed" });
    await repo.addEasypayCallback({
      response: `EASY PAY DEPOSIT INITIATE ERROR!!!\n${error.message}`,
    });
    throw new Error(error.message);
  }
}

async function initiateMMSend({ senderNumber, cardNumber, amount, reason }) {
  const repo = await repository();
  const card = await repo.findCardByCardNumber(cardNumber);

  if (!card || !card.student) {
    throw new Error("invalid card number");
  }

  const reference = uuid.v4();
  const receiverId = card.student.id;
  const serviceFee = getServiceFee(amount);
  await repo.addMMSend({
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
    senderNumber
    // transactionId: mmSend.id,
  };
}

async function startMMSend(reference) {
  const repo = await repository();
  // await repo.updateMMSendStatusByReference({
  //   reference,
  //   status: "processing",
  // });
  const { senderNumber, amount, serviceFee } = await repo.getMMSendByReference(
    reference
  );
  // where everything changed
  await startEasyPayDeposit({
    reference,
    amount: amount + serviceFee,
    number: senderNumber,
  });
  return;
}

module.exports = {
  initiateMMSend,
  startMMSend,
};
