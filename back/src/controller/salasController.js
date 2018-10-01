const getSalas = require('../service/salaService/getSalasService')
const cadastrarSala = require('../service/salaService/cadastrarSalaService')
const editarSala = require('../service/salaService/editarSalaService')
const deletarSala = require('../service/salaService/deleteSalaService')


exports.get = (req, res, next) => {

    getSalas.getSalasService()
        .then((salas) => {
            console.log(salas)
            res.status(200).send(salas);
        })
};

exports.post = (req, res, next) => {
    let sala = req.body

    console.log(sala)

    cadastrarSala.cadastrarSalaService(sala)

    res.status(200).send(sala);
};

exports.put = (req, res, next) => {
    let sala = req.body
    
    editarSala.editarSalaService(sala)

    res.status(200).send(sala);
};

exports.delete = (req, res, next) => {
    let id = req.params.id;

    deletarSala.deleteSalaService(id)
  
    res.status(200).send();
};