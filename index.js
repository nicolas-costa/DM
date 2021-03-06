'use strict';
const express = require('express');
const consign = require('consign');
const app = express();

consign({verbose: false}, { cwd: 'src' })
    .include('./src/models/index.js')
    .then('./src/repositories/')
    .then('./src/controllers/')
    .then('./src/routes/')
    .into(app);


app.listen(3000, () => {
    console.log('Running');
})
