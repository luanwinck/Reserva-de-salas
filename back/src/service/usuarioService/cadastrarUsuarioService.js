const dbconfig = require("../dbconfig.js")
const mysql = require('mysql')

function cadastrarUsuarioService(usuario) {

    usuario.permissao = '1'
    usuario.funcao = '1'

    let sql = 'insert into usuarios (nome, email, senha, permissao, funcao)' 
        sql +='values ('
        sql +=  mysql.escape(usuario.nome) + ',' + 
                mysql.escape(usuario.email) + ',' + 
                mysql.escape(usuario.senha) + ',' + 
                mysql.escape(usuario.permissao) + ',' + 
                mysql.escape(usuario.funcao) +
        ')';

    dbconfig.conexao.query(sql, function (err, result) {

        // if (err) throw err;
        if (err) console.log(err)
            
    });
}

module.exports = {
    cadastrarUsuarioService,
}