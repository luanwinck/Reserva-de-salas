import ApiService from './ApiService'

class GetSalasDisponiveisService {
    static getSalasDisponiveis(data, horaInicial, horaFinal) {
        return ApiService.getSalasDisponiveis(data, horaInicial, horaFinal)
    }
}

export default GetSalasDisponiveisService
