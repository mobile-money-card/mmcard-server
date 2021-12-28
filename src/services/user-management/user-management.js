const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const repository = require("../repository/repository");
const config = require("../../config/config");

async function signUpRegistrationAgent(signUpData) {
  const { name, email, password } = signUpData;
  const repo = await repository();

  const existingRAgent = await repo.getRegistrationAgentWithEmail(email);
  if (existingRAgent) {
    throw new Error("user with this email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 8);
  const newRAgent = await repo.addRegistrationAgent({
    name,
    email,
    hashedPassword,
  });

  return newRAgent;
}

async function logInRegistrationAgent(logInData) {
  const { email, password } = logInData;
  const repo = await repository();

  const rAgent = await repo.getRegistrationAgentWithEmail(email);

  if (!rAgent) {
    throw new Error("user does not exist");
  }

  const { hashedPassword } = rAgent;
  const isPasswordCorrect = await bcrypt.compare(password, hashedPassword);

  if (!isPasswordCorrect) {
    throw new Error("wrong password");
  }

  const token = generateAuthToken(rAgent.id);

  return {
    id: rAgent.id,
    name: rAgent.name,
    email: rAgent.email,
    token,
    role: "r-agent",
  };
}

function generateAuthToken(userId) {
  return jwt.sign({ id: userId }, config.JWT_SECRET, { expiresIn: "1d" });
}

async function verifyAuthToken(token) {
  const verify = promisify(jwt.verify);
  return await verify(token, config.JWT_SECRET);
}

async function createStudentAccount(studentData) {
  const repo = await repository();
  const {name, schoolId, cardNumber} = studentData;
  const card = await repo.findCardByCardNumber(cardNumber);
  if(!card){
    throw new Error("card is not in the database");
  }
  return await repo.addStudent({name, schoolId, cardId: card.id});
}

// console.log(generateAuthToken("184246dc-3ace-49f7-9b06-017334970cd1"));
// verifyAuthToken(
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE4NDI0NmRjLTNhY2UtNDlmNy05YjA2LTAxNzMzNDk3MGNkMSIsImlhdCI6MTY0MDUyMDcxMywiZXhwIjoxNjQwNTIwNzQzfQ.WxQpHeoia0htQBUcr3KsYDx1hVBKpycaUtK_wTE_l10"
// )
//   .then(({ id }) => console.log("user id from token: ", id))
//   .catch((error) => {
//     if(error.message === "jwt expired") console.log("your token is expired man", error.name);
//     else if(error.message === "invalid token") console.log("the token is invalid man", error.name);
//     else console.log("token error", error.name)
//   });

module.exports = {
  signUpRegistrationAgent,
  logInRegistrationAgent,
  generateAuthToken,
  verifyAuthToken,
  createStudentAccount
};
