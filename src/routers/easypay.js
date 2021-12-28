const express = require("express");
const repository = require("../services/repository/repository");
const router = express.Router();

router.get("/", (_, res) => {
  return res.json({ message: "this is the easypay api" });
});

router.post("/", async (req, res) => {
  try {
    const repo = await repository();
    await repo.addEasypayCallback({ response: JSON.stringify(req.body) });
  } catch (error) {
    await repo.addEasypayCallback({ response: `ERROR!!!: ${error.message}` });
  } finally {
    res.json(null);
  }
});

module.exports = router;
