const dbconfig = require("../dbconfig.js")
const mysql = require('mysql')

function cadastrarUsuarioService(sala) {

    console.log(sala)

    let sql = 'insert into usuario (nome, email, senha, permissao, funcao)' 
        sql +='values ('
        sql +=  mysql.escape(sala.nome) + ',' + 
                mysql.escape(sala.email) + ',' + 
                mysql.escape(sala.senha) + ',' + 
                mysql.escape(sala.permissao) + ',' + 
                mysql.escape(sala.funcao) + ',' + 
        ')';

    dbconfig.conexao.query(sql, function (err, result) {

        // if (err) throw err;
        if (err) console.log(err)
            
    });
}

module.exports = {
    cadastrarUsuarioService,
}