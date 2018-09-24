const express = require('express');
const app = express();
const router = express.Router();

const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

const index = require('./routes/index');
const produtoRoute = require('./routes/produtoRoute');
const usuarioRoute = require('./routes/usuarioRoute');
const salasRoute = require('./routes/salasRoute');

app.use('/', index);
app.use('/produto', produtoRoute);
app.use('/usuario', usuarioRoute);
app.use('/salas', salasRoute);

module.exports = app;
