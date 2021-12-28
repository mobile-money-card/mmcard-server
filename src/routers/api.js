const express = require("express");
const {
  sendMobileMoneyToCard,
} = require("../services/transactions/transactions");
const router = express.Router();

router.get("/", (_, res) => {
  return res.json({ message: "this is the student api" });
});

router.post("/send", async (req, res) => {
  try {
    const transaction = await sendMobileMoneyToCard(req.body);
    res.json({ ...transaction });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
