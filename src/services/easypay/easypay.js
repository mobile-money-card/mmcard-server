const axios = require("axios").default;

async function easypayDeposit({ reference, amount, number }) {
  try {
    const payload = {
      username: process.env.EASY_PAY_USERNAME,
      password: process.env.EASY_PAY_PASSWORD,
      action: "mmdeposit",
      amount: amount,
      currency: "UGX",
      phone: number,
      reference: reference,
      reason: "send money to mm card",
    };

    const response = await axios.post(process.env.EASY_PAY_ENDPOINT, {
      ...payload,
    });

    if(response.data.success === 1) {
      const {status} = response.data.data;
      return status.toLowerCase();
    }

    return "failed";
  } catch (error) {
    if (error.response) {
      if (error.response.status === 524) return "pending";
      throw new Error("bad request");
    } else if (error.request) {
      throw new Error("no response");
    } else {
      throw new Error("no request");
    }
  }
}

module.exports = {
  easypayDeposit
}
