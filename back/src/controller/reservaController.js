const cadastrarReserva = require('../service/reservaService/cadastrarReservaService')

exports.post = (req, res, next) => {
    let reserva = req.body

    cadastrarReserva.cadastrarReservaService(reserva)

    res.status(200).send(reserva);
};
