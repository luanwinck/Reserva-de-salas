const express = require('express');
const router = express.Router();
const controller = require('../controller/reservaController')
router.get('/', controller.get)
router.post('/cadastrar', controller.post);

module.exports = router;