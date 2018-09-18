module.exports = class Reserva{
    constructor(id, id_sala, id_usuario, data_inicial, data_final, descricao){
        this.id = id
        this.id_sala = id_sala
        this.id_usuario = id_usuario
        this.data_inicial = data_inicial
        this.data_final = data_final
        this.descricao = descricao
    }
}