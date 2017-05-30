let model = require('./models/usuario');
module.exports = function(req, res){
  var data = new model({
    user: req.body.user,
    senha: req.body.senha
    });
    data.save(function(err) {
      if (err)
        res.send(err);
      res.json({ message: 'Novo Usuário', data: data });
    });
};
