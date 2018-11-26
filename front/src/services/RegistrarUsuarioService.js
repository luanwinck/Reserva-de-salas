import ApiService from './ApiService'

class RegistrarUsuarioService {
    static registrarUsuario(nome, email, senha) {
        return ApiService.registrarUsuario(nome, email, senha)
    }
}

export default RegistrarUsuarioService
