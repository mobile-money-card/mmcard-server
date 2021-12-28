const express = require("express");
const router = express.Router();
const repository = require("../services/repository/repository");
const {
  logInRegistrationAgent, createStudentAccount
} = require("../services/user-management/user-management");

router.get("/", (_, res) => {
  return res.json({ message: "this is the r-agent api" });
});

router.post("/login", async (req, res) => {
  try {
    const rAgent = await logInRegistrationAgent(req.body);
    res.json({ ...rAgent });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/school-list", async (_, res) => {
  try {
    const repo = await repository();
    const schools = await repo.getAllSchools();
    res.json(schools);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/register-student", async (req, res) => {
  try {
  console.table(req.body);
    await createStudentAccount(req.body);
    res.json({message: "student account created"});
  }
  catch(error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
