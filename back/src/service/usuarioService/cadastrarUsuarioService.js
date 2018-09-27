const dbconfig = require("../dbconfig.js")
const mysql = require('mysql')

function cadastrarUsuarioService(usuario) {

    let sql = 'insert into usuario (nome, email, senha, permissao, funcao)' 
        sql +='values ('
        sql +=  mysql.escape(usuario.nome) + ',' + 
                mysql.escape(usuario.email) + ',' + 
                mysql.escape(usuario.senha) + ',' + 
                mysql.escape(usuario.permissao) + ',' + 
                mysql.escape(usuario.funcao) + ',' + 
        ')';

    dbconfig.conexao.query(sql, function (err, result) {

        // if (err) throw err;
        if (err) console.log(err)
            
    });
}

module.exports = {
    cadastrarUsuarioService,
}