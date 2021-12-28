const apiRouter = require("./api");
const studentApiRouter = require("./api.student");
const mmAgentApiRouter = require("./api.mm-agent");
const rAgentApiRouter = require("./api.r-agent");
const easypayRouter = require("./easypay");

module.exports = (app) => {
  app.use("/api", apiRouter);
  app.use("/api/easypay", easypayRouter);
  app.use("/api/student", studentApiRouter);
  app.use("/api/mm-agent", mmAgentApiRouter);
  app.use("/api/r-agent", rAgentApiRouter);
};
