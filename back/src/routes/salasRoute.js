const express = require('express');
const router = express.Router();
const controller = require('../controller/salasController')
router.get('/', controller.get);
router.post('/cadastrar', controller.post);
router.put('/editar', controller.put);
router.delete('/deletar/:id', controller.delete);

module.exports = router;