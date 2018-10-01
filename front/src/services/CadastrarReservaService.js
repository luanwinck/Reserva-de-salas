import ApiService from './ApiService'

class CadastrarReservaService {
    static cadastrarReserva(idSala, idUsuario, data, horaInicial, horaFinal, descricao) {
        return ApiService.cadastrarReserva(idSala, idUsuario, data, horaInicial, horaFinal, descricao)
    }
}

export default CadastrarReservaService
