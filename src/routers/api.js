const express = require("express");
const { initiateMMSend, startMMSend } = require("../services/transactions/transactions");
const router = express.Router();

router.get("/", (_, res) => {
  return res.json({ message: "this is the student api" });
});

router.post("/send", async (req, res) => {
  try {
    const transaction = await initiateMMSend(req.body);
    res.json({ ...transaction });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/start-send", async (req, res) => {
  try {
    const { reference } = req.body;
    
    await startMMSend(reference);
    res.json(null);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
