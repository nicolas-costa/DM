"use strict";
const express = require("express");
const consign = require("consign");
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config({
    path: process.env.NODE_ENV === "test" ? ".env.testing" : ".env"
});

const jsonParser = bodyParser.json();

app.use(jsonParser);

consign({ verbose: false }, { cwd: "src" })
  .include("./src/models/index.js")
  .then("./src/repositories/")
  .then("./src/controllers/")
  .then("./src/routes/")
  //.then("./src/workers/")
  .into(app);

const port = process.env.PORT || 3000;

app.listen(port, () => {});

module.exports = app;
