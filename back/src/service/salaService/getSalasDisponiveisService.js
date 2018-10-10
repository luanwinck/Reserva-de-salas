const dbconfig = require("../dbconfig.js")
const mysql = require('mysql')

function getSalasDisponiveisService(reserva) {

    return new Promise(function(resolve, reject) {

        // let sql = 'SELECT * FROM salas WHERE id NOT IN ('
        // sql += 'SELECT salas.id FROM salas LEFT JOIN reservas ON reservas.id_sala = salas.id';
        // sql += ' WHERE reservas.data_inicial BETWEEN ' + formatDateTime(reserva.data, reserva.horaInicial);
        // sql += ' AND ' + formatDateTime(reserva.data, reserva.horaFinal);

        // sql += ' OR reservas.data_final BETWEEN '+ formatDateTime(reserva.data, reserva.horaInicial);
        // sql += ' AND ' + formatDateTime(reserva.data, reserva.horaFinal);

        // sql += 'OR '+ formatDateTime(reserva.data, reserva.horaInicial);
        // sql += ' BETWEEN reservas.data_inicial AND reservas.data_final';
        
        // sql += ' OR '+ formatDateTime(reserva.data, reserva.horaFinal);
        // sql += ' BETWEEN reservas.data_inicial AND reservas.data_final)';

        let sql = 'SELECT * FROM salas WHERE id NOT IN ('
        sql += 'SELECT salas.id FROM salas LEFT JOIN reservas ON reservas.id_sala = salas.id';
        sql += ' WHERE reservas.data_inicial >= ' + formatDateTime(reserva.data, reserva.horaInicial);
        sql += ' AND reservas.data_inicial <=' + formatDateTime(reserva.data, reserva.horaFinal);

        sql += ' OR reservas.data_final >= '+ formatDateTime(reserva.data, reserva.horaInicial);
        sql += ' AND reservas.data_final <=' + formatDateTime(reserva.data, reserva.horaFinal);

        sql += ' OR '+ formatDateTime(reserva.data, reserva.horaInicial);
        sql += ' >= reservas.data_inicial ';
        sql += ' AND '+ formatDateTime(reserva.data, reserva.horaInicial);
        sql += ' <= reservas.data_final';
        
        sql += ' OR '+ formatDateTime(reserva.data, reserva.horaFinal);
        sql += ' >= reservas.data_inicial ';
        sql += ' AND '+ formatDateTime(reserva.data, reserva.horaFinal);
        sql += ' <= reservas.data_final )';

        console.log(sql)
                    
        dbconfig.conexao.query(sql, function (err, result, fields) {
            
            if (err) return reject(err);                           
             
            return resolve(JSON.parse(JSON.stringify(result)));
              
        });
    })           
}

function formatDateTime(date, time) {
    return mysql.escape(date + ' ' + time)
}

module.exports = {
    getSalasDisponiveisService,
}