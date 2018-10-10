const cadastrarReserva = require('../service/reservaService/cadastrarReservaService')
const getReservasOrdenadasPorDataDesc = require('../service/reservaService/getReservasOrdenadasPorDataDesc')

exports.get = (req, res, next) => {

    getReservasOrdenadasPorDataDesc.getReservas()
        .then((reservas) => {
            res.status(200).send(reservas);
        })
};


exports.post = (req, res, next) => {
    let reserva = req.body

    cadastrarReserva.cadastrarReservaService(reserva)

    res.status(200).send(reserva);
};
