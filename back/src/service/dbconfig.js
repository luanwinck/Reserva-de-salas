var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "reserva_salas"
});



module.exports={               
    conexao:con
    
}