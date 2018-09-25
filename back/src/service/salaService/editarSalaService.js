const dbconfig = require("../dbconfig.js")
const mysql = require('mysql')

function editarSalaService(sala) {

    const sql = 'update salas set nome ='+ mysql.escape(sala.nome) +','+
                'descricao ='+ mysql.escape(sala.descricao) +
                'where id ='+ sala.id ;

    dbconfig.conexao.query(sql, function (err, result) {

        // if (err) throw err;
        if (err) console.log(err)
            
    });
}

module.exports = {
    editarSalaService,
}