const express = require('express');
const router = express.Router();
const controller = require('../controller/salasController')
const authService = require('../service/authService/authService')
router.get('/', authService.verifyToken, controller.get);
router.post('/cadastrar', controller.post);
router.post('/disponiveis', controller.getSalasDisponiveis);
router.put('/editar', controller.put);
router.delete('/deletar/:id', controller.delete);

module.exports = router;