const express = require("express");
const router = express.Router();

router.get("/", (_, res) => {
  return res.json({message: "this is the student api"});
});

module.exports = router;