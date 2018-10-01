const express = require('express');
const router = express.Router();
const controller = require('../controller/reservaController')
router.post('/cadastrar', controller.post);

module.exports = router;