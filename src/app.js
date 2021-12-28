const path = require("path");
const express = require("express");
const env = process.env.NODE_ENV || "development";

if (env === "development") {
  require("dotenv").config();
}

const cors = require("cors");

const routers = require("./routers/routers");


const app = express();

app.use(cors());
app.use("/api", express.json());
app.use(express.static(path.join(__dirname, "public")));

routers(app);

app.get("/*", (_, res)=> {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});


module.exports = app;