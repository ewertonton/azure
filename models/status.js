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

var statusSchema = new mongoose.Schema({
  fbname: String,
  content: String,
  likes: Number,
  comments: Number
});

// EXPORTA O MODULO
module.exports = restful.model('tblstatus', statusSchema);
