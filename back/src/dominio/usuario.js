module.exports = class Usuario{
    constructor(id, nome, email, senha, permissao, funcao){
        this.id = id
        this.nome = nome
        this.email = email
        this.senha = senha
        this.permissao = permissao
        this.funcao = funcao
    }
}