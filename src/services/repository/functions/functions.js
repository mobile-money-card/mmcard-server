const admin = require("./admin");
const card = require("./card");
const mmAgent = require("./mm-agent");
const mmSend = require("./mm-send");
const registrationAgent = require("./registration-agent");
const school = require("./school");
const student = require("./student");
const easypayCallback = require("./easypay-callback");

module.exports = (models, sequelize) => {
  return {
    admin: admin(models, sequelize),
    card: card(models, sequelize),
    mmAgent: mmAgent(models, sequelize),
    mmSend: mmSend(models, sequelize),
    registrationAgent: registrationAgent(models, sequelize),
    school: school(models, sequelize),
    student: student(models, sequelize),
    easypayCallback: easypayCallback(models, sequelize),
  };
};
