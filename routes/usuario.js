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
let express = require('express');
let jwt = require('jsonwebtoken');
/*
 * GET / retorna todos os usuários.
 */
function getUsuarios(req, res) {
    // Retorna todos os usuários
    let query = Usuario.find({});
    query.exec((err, usuarios) => {
        if(err) res.send(err);
        // Se não houver erros, retorna todos usuários
        res.json(usuarios);
    });
}
function getUsuarios2(req, res) {
    // Retorna todos os usuários
    let query = Usuario.find({});
    query.exec((err, usuarios) => {
        if(err) res.send(err);
        // Se não houver erros, retorna todos usuários
        let js = "{ 'usuarios': " + usuarios + "}";
        //res.json(js);
        res.send(js);
    });
}

function getUsuarios3(req, res) {
  var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
    if (token) {
       try {
         var decoded = jwt.verify(token, 'b0r@');
         console.log('decodando ' + decoded);
        //2
         if (decoded.exp <= Date.now()) {
           res.json(400, {error: 'Acesso Expirado, faça login novamente'});
         }
         //3
         model.findOne({ _id: decoded.id }, function(err, user) {
           if(err) res.status(500).json({message: "erro ao procurar usuario do token."})
           req.user = user;
           console.log('achei usuario ' + req.user)
           //return next();
           res.json(user);
         });
       //4
       } catch (err) {
         res.status(401).json({message: 'Erro: Seu token é inválido'});
       }
     } else {
       res.json(401, {message: 'Token não encontrado ou informado'})
    }
}
/*
 * POST / insere um novo usuário.
 */
function postUsuario(req, res) {
    // Cria um novo usuário
    var newUsuario = new Usuario(req.body);
    // Salva no Mongo
    newUsuario.save((err, usuario) => {
        if(err) {
            res.send(err);
        } else {
          // Se não houver erros, retorna esta mensagem
            res.json({ message: "Usário adicionado com sucesso!", usuario });
        }
    });
}

function postAutenticacao(req, res) {
    let user = new Usuario(req.body);
    // Checa a exisência do usuário
    Usuario.findOne({ user: user.user }, (err, usuario) => {
        if(err) res.send(err);
        // Se não houver erros, prossegue
        if (!usuario) {
            // Se o usuário não existe
            res.json({ success: false, message: 'Autenticação falhou. Usuário não encontrado.' });
        } else if (usuario) {
            // checa se a senha está correta
            if (usuario.senha != user.senha) {
                // se a senha estiver errada
                res.json({ success: false, message: 'Falha na autenticação. Senha incorreta.' });
            } else {
                // se a senha estiver correta, cria um token
                var token = jwt.sign({ data: user.id} , 'b0r@', { expiresIn: '1h'});
                // retorna o token como JSON
                res.json({
                    success: true,
                    message: 'Você possui um token!',
                    token: token,
                    expires: '1h',
                    user: user.toJSON()

                });
            }
        }
    });
}

/*
 * GET /usuario/:id retotna o usuário dono do id.
 */
function getUsuario(req, res) {
    Usuario.findById(req.params.id, (err, usuario) => {
        if(err) res.send(err);
        // Se não houver erros, retorna esta mensagem
        res.json(usuario);
    });
}

/*
 * DELETE /usuario/:id para deletar o usuário dono do id.
 */
function deleteUsuario(req, res) {
    Usuario.remove({_id : req.params.id}, (err, result) => {
      // Retorna esta mensagem
        res.json({ message: "Usuário deletado com sucesso!", result });
    });
}

/*
 * PUT /usuario/:id para atualizar o usuário dono do id.
 */
function updateUsuario(req, res) {
    Usuario.findById({_id: req.params.id}, (err, usuario) => {
        if(err) res.send(err);
        Object.assign(usuario, req.body).save((err, usuario) => {
            if(err) res.send(err);
            // Retorna esta mensagem
            res.json({ message: 'Usuário atualizado!', usuario });
        });
    });
}


function validation(req, res, next) {
  var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
//1
  if (token) {

    try {
      var decoded = jwt.verify(token, 'b0r@');
      if(decoded == 'BORA'){
        return next();
      }
    } catch(err) {
      // err
      res.json(401, {message: 'Zica'})
    }

    /*
  try {

    var decoded = jwt.verify(token, 'b0r@');
    console.log('decodando ' + decoded);


   //2
    if (decoded.exp <= Date.now()) {
      res.json(400, {error: 'Acesso Expirado, faça login novamente'});
    }
    //3
    Usuario.findOne({ user: decoded.user }, function(err, user) {
      if(err)
        res.status(500).json({message: "erro ao procurar usuario do token."})
      req.user = user;
      console.log('achei usuario ' + req.user)
      return next();
    });
  //4
  } catch (err) {
    return res.status(401).json({message: 'Erro: Seu token é inválido'});
  }
  */
} else {
  res.json(401, {message: 'Token não encontrado ou informado'})
}
};

//EXPORTA O MÓDULO
module.exports = { getUsuarios, postUsuario, getUsuario, deleteUsuario, updateUsuario, postAutenticacao, getUsuarios2, validation, getUsuarios3 };
