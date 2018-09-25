const dbconfig = require("../dbconfig.js")

function deleteSalaService(id) {

    const sql = 'delete from salas where id =' + id;

    dbconfig.conexao.query(sql, function (err, result) {

        // if (err) throw err;
        if (err) console.log(err)
            
    });
}

module.exports = {
    deleteSalaService,
}