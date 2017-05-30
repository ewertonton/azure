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
var restful = require('node-restful');
var mongoose = restful.mongoose;

// DOCUMENTO
var cupomSchema = new mongoose.Schema({
  cupomID: mongoose.Schema.ObjectId,
  barID: String,
  titulo: String,
  valor: Number,
  descricao: String,
  imagem: { type: String, required: false },
  criada: { type: String, required: false },
  validade: { type: Number, default: 7 },
  update: { type: Date, default: Date.now }
},
{
  versionKey: false
});

// INSERE A DATA ATUAL
cupomSchema.pre('save', next => {
  now = new Date();
  if(!this.update) {
    this.update = now;
  }
  next();
});

// EXPORTA O MODULO
module.exports = restful.model('cupons', cupomSchema);
