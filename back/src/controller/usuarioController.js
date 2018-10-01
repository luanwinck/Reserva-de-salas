const login = require('../service/usuarioService/loginService')
const cadastrarUsuario = require('../service/usuarioService/cadastrarUsuarioService')


exports.login = (req, res, next) => {

    login.loginService()
        .then(() => {
            res.status(200).send();
        })
        .catch(() => {
            res.status(404).send();
        })
};

exports.registrar = (req, res) => {
    let usuario = req.body 

    cadastrarUsuario.cadastrarUsuarioService(usuario)

    res.status(201).send(usuario);
};
