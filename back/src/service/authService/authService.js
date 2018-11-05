const jwt = require('jsonwebtoken');
const config = require('../../config.json')

function getToken(email, id) {
    
    return jwt.sign({ email, id }, config.SigningKey, {
        expiresIn: 300 // expires in 5min
    });
           
}

function verifyToken(req, res, next){
    var token = req.headers['x-access-token'];

    if (!token) 
        return res.status(401).send({ auth: false, message: "Não foi fornecido um token" });

    jwt.verify(token, config.SigningKey, function(err, decoded) {
        if (err) 
        return res.status(401).send({ auth: false, message: "Token incorreto ou expirado" });
        
        next();     
    });
}

module.exports = {
    getToken,
    verifyToken,
}