const dbconfig = require("../dbconfig.js")

function getReservas() {

    return new Promise(function(resolve, reject) {
        
        let sql = 'SELECT reservas.descricao, reservas.data_inicial, reservas.data_final, usuarios.nome as usuario, salas.nome as sala FROM reservas ';
        sql += 'INNER JOIN salas ON reservas.id_sala = salas.id ';
        sql += 'INNER JOIN usuarios ON reservas.id_usuario = usuarios.id ';
        sql += 'ORDER BY data_final';
                    
        dbconfig.conexao.query(sql, function (err, result, fields) {
            
            //  if (err) throw reject(err);                           
             
            return resolve(JSON.parse(JSON.stringify(result)));
              
        });
    })           
}

module.exports = {
    getReservas,
}