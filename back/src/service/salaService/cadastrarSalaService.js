const dbconfig = require("../dbconfig.js")
const mysql = require('mysql')

function cadastrarSalaService(sala) {

    let sql = 'insert into salas (nome , descricao) ';
        sql +='values ('+ mysql.escape(sala.nome) + ',' + mysql.escape(sala.descricao) +')';

    // const sql = 'INSERT INTO salas (nome, descricao) VALUES ('+ sala.nome + ',' + sala.descricao +')';

    dbconfig.conexao.query(sql, function (err, result) {

        // if (err) throw err;
        if (err) console.log(err)
            
    });
}

module.exports = {
    cadastrarSalaService,
}