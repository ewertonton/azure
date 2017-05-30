/*
*********************************************
*   BORA TOMAR UMA - API RESTFUL
*********************************************
*   @author Ewerton "Tonton" Menezes
*   @contact eweexy@gmail.com
*   @versão: 1.0.0
*********************************************
*/
// DEPENDENCIAS
let mongoose = require('mongoose');
let Usuario = require('../models/usuario');
let jwt = require('jsonwebtoken');
let express = require('express');
//let routes = express.Router();
let app = express();
/*
 * POST / insere um novo usuário.
 */
function autenticacao(req, res) {
//routes.post('/login', function(req, res) {
    // Cria um novo usuário
    Usuario.findOne({
        nome: req.body.nome
    },
    function(err, usuario) {
        if (err) throw err;
        if (!usuario) {
          res.json({ success: false, message: 'Autenticação falhou. usuário não encontrado.' });
        } else if (usuario) {
          // check if password matches
            if (usuario.senha != req.body.senha) {
                res.json({ success: false, message: 'Falha na autenticação. Senha incorreta.' });
            } else {
                // if user is found and password is right
                // create a token
                var token = jwt.sign(usuario, app.get('segredo'),
                {
                  expiresInMinutes: 1440 // expires in 24 hours
                });
                // return the information including token as JSON
                res.json({
                    success: true,
                    message: 'Você possui um token!',
                    token: token
                });
            }
        }
    });
//});
}

//EXPORTA O MÓDULO
module.exports = { autenticacao };
