const dbconfig = require("../dbconfig.js")

function loginService(email, senha) {

    return new Promise(function(resolve, reject) {

        const sql = ' SELECT * FROM usuario WHERE email ='+ email +' AND senha ='+ senha;
                    
        dbconfig.conexao.query(sql, function (err, result, fields) {
            
            //  if (err) throw reject(err);                           
             
            return resolve(JSON.parse(JSON.stringify(result)));
              
        });
    })           
}

module.exports = {
    loginService,
}