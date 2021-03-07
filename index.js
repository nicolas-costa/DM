"use strict";
const express = require("express");
const consign = require("consign");
const bodyParser = require('body-parser');
const app = express();

const jsonParser = bodyParser.json();

app.use(jsonParser);


consign({ verbose: false }, { cwd: "src" })
  .include("./src/models/index.js")
  .then("./src/repositories/")
  .then("./src/controllers/")
  .then("./src/routes/")
  .into(app);

app.listen(3000, () => {
  console.log("Running");
});
