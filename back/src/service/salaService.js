


function altera(objeto) {  
    const sql = ' update produto set codigoproduto='+objeto.codigo+','+
                                  'descricao='+mysql.escape(objeto.descricao)+','+
                                  'un='+mysql.escape(objeto.un)+','+
                                  'quantidade='+formatValor(objeto.quantidade)+','+
                                  'precoun='+formatValor(objeto.precoun)+
               ' where codigoproduto='+objeto.codigo;

       
    //imprime para no console para ver
    console.log(sql)

    //executa a query. 
    dbconfig.conexao.query(sql, function (err, result) {
       //se ocorrer um erro entra aqui 
       if (err) throw err;
    
       //se não mostra o resultado
       console.log(result);
     
    });

}