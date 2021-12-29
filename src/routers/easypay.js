const express = require("express");
const repository = require("../services/repository/repository");
const router = express.Router();

router.get("/", (_, res) => {
  return res.json({ message: "this is the easypay api" });
});

router.post("/", async (req, res) => {
  try {
    const repo = await repository();
    console.log("EASY PAY HAS CALLED BACK: ", req.body);
    if (req.body.success === 1) {
      const { status, reference } = req.body.data;
      await repo.updateMMSendStatusByReference({
        reference,
        status: status.toLowerCase(),
      });
    }
    await repo.addEasypayCallback({
      response: `EASY PAY CALLBACK\n ${JSON.stringify(req.body)}`,
    });
  } catch (error) {
    await repo.addEasypayCallback({ response: `ERROR!!!: ${error.message}` });
  } finally {
    res.json(null);
  }
});

module.exports = router;
