const dbconfig = require("../dbconfig.js")

function getSalasService() {

    return new Promise(function(resolve, reject) {

        const sql = ' SELECT * FROM salas';
                    
        dbconfig.conexao.query(sql, function (err, result, fields) {
            
            //  if (err) throw reject(err);                           
             
            return resolve(JSON.parse(JSON.stringify(result)));
              
        });
    })           
}

module.exports = {
    getSalasService,
}