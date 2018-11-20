const login = require('../service/usuarioService/loginService')
const cadastrarUsuario = require('../service/usuarioService/cadastrarUsuarioService')
const authService = require('../service/authService/authService')


exports.login = (req, res, next) => {
    const usuario = req.body 

    login.loginService(usuario)
        .then((usuario) => {
            console.log(usuario.email)
            const token = authService.getToken(usuario[0].email, usuario[0].id)


            if (usuario.length <= 0) {
                res.status(404).send("Email ou senha incorretos");                
            }
            res.status(200).send({token});
        })
        .catch(() => {
            res.status(404).send("Email ou senha incorretos");
        })
};

exports.registrar = (req, res) => {
    const usuario = req.body 

    cadastrarUsuario.cadastrarUsuarioService(usuario)

    res.status(201).send(usuario);
};
