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
var barSchema = new mongoose.Schema({
    barID: mongoose.Schema.ObjectId,
    nome: { type: String, required: true },
    avatar: { type: String, required: false },
    descricao: { type: String, required: true },
    sobre: { type: String, required: true },
    latitude: { type: Number, default: 0 },
    longitude: { type: Number, default: 0 },
    endereco: { type: String, required: true },
    email: { type: String, required: true },
    telefone: { type: String, required: true },
    update: { type: Date, default: Date.now },
},
{
  versionKey: false
});

// INSERE A DATA ATUAL
barSchema.pre('save', next => {
  now = new Date();
  if(!this.update) {
    this.update = now;
  }
  next();
});

// EXPORTA O MODULO
module.exports = restful.model('bares', barSchema);
