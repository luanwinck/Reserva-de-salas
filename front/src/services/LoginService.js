import ApiService from './ApiService'

class LoginService {
    static login(email, senha) {
        return ApiService.login(email, senha)
    }
}

export default LoginService
