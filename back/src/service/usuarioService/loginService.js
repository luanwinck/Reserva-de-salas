const dbconfig = require("../dbconfig.js")
const mysql = require('mysql')

function loginService(usuario) {

    return new Promise(function(resolve, reject) {

        const sql = ' SELECT * FROM usuarios WHERE email ='+ mysql.escape(usuario.email) +' AND senha ='+ mysql.escape(usuario.senha);
                    
        dbconfig.conexao.query(sql, function (err, result, fields) {
            console.log(sql)
            
            if (err) throw reject(err);    
            console.log(err)                       
             
            return resolve(JSON.parse(JSON.stringify(result)));
              
        });
    })           
}

module.exports = {
    loginService,
}