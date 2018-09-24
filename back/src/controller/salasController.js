const salaService = require('../service/salaService/getSalasService')


exports.get = (req, res, next) => {

    salaService.getSalasService()
    .then((salas) => {
        console.log(salas)
        res.status(200).send(salas);
    })
};