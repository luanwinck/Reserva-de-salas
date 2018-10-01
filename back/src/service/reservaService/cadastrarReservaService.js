const dbconfig = require("../dbconfig.js")
const mysql = require('mysql')

function cadastrarReservaService(reserva) {

    let sql = 'INSERT INTO reservas (id_sala, id_usuario, data_inicial, data_final, descricao)'
        sql += 'VALUES (' + reserva.idSala + ',' + reserva.idUsuario + ',' 
        sql += formatDateTime(reserva.data, reserva.horaInicial) + ',' 
        sql += formatDateTime(reserva.data, reserva.horaFinal) + ',' 
        sql +=  mysql.escape(reserva.descricao) + ')';

    console.log('SQL:  ' + sql)


    dbconfig.conexao.query(sql, function (err, result) {

        // if (err) throw err;
        if (err) console.log(err)
            
    });
}

function formatDateTime(date, time) {
    return mysql.escape(date + 'T' + time)
}

module.exports = {
    cadastrarReservaService,
}