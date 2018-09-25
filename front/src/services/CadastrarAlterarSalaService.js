import ApiService from './ApiService'

class CadastrarAlterarProdutoService {
    static cadastrarAlterarSala(id, nome, descricao) {
        return ApiService.cadastrarAlterarSala(id, nome, descricao)
    }
}

export default CadastrarAlterarProdutoService
