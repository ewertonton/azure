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
let restful = require('node-restful');
let mongoose = restful.mongoose;
let bcrypt = require('bcrypt-nodejs');

// AMIGO
let amigo = new mongoose.Schema({
  usuarioID: mongoose.Schema.ObjectId,
  nome: String,
  avatar: String,
});

// FAVORITO
let favorito = new mongoose.Schema({
  barID: mongoose.Schema.ObjectId,
  nome: String,
  avatar: String,
});

// DOCUMENTO
let usuarioSchema = new mongoose.Schema({
    usuarioID: mongoose.Schema.ObjectId,
    user: { type: String, required: true },
    senha: { type: String, required: true },
    email: { type: String, required: true },
    nome: { type: String, required: true },
    telefone: { type: String, required: false },
    sexo: { type: String, required: true },
    local: { type: String, required: true },
    avatar: { type: String, required: false },
    dindin: { type: Number, default: 100 },
    update: { type: Date, default: Date.now },
    amigos: [amigo],
    favoritos: [favorito]
},
{
  versionKey: false
});

// INSERE A DATA ATUAL
usuarioSchema.pre('save', next => {
  now = new Date();
  if(!this.update) {
    this.update = now;
  }
  // INICIO MODIFICAÇÃO
  let user = this;
  if (!user.isModified('senha')) return next();
  bcrypt.genSalt(5, function(err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.senha, salt, null, function(err, hash) {
      if (err) return next(err);
      user.senha = hash;
      next();
    });
  });
  // FIM MODIFICAÇÃO

  next();
});


// INICIO MODIFICAÇÃO
usuarioSchema.methods.verificaSenha = function(senha, next) {
  bcrypt.compare(senha, this.senha, function(err, isMatch) {
    if (err) return next(err);
    next(isMatch);
  });
};
  // FIM MODIFICAÇÃO


// EXPORTA O MODULO
module.exports = restful.model('usuarios', usuarioSchema)
