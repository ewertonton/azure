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
let Bar = require('../models/bar');

/*
 * GET / retorna todos os bares.
 */
function getBares(req, res) {
    // Retorna todos os bares
    let query = Bar.find({});
    query.exec((err, bares) => {
        if(err) res.send(err);
        // Se não houver erros, retorna todos bares
        res.json(bares);
    });
}

function getBares2(req, res) {
    // Retorna todos os bares
    let query = Bar.find({});
    query.exec((err, bares) => {
        if(err) res.send(err);
        // Se não houver erros, retorna todos bares
        let js = "{ 'bares': }" + bares + "}";
        res.send(js);
    });
}
/*
 * POST / insere um novo bar.
 */
function postBar(req, res) {
    // Cria um novo bar
    var newBar = new Bar(req.body);
    // Salva no Mongo
    newBar.save((err, bares) => {
        if(err) {
            res.send(err);
        }
        else {
          // Se não houver erros, retorna esta mensagem
            res.json({ message: "Bar adicionado com sucesso!", bares });
        }
    });
}

/*
 * GET /bar/:id retotna o bar dono do id.
 */
function getBar(req, res) {
    Bar.findById(req.params.id, (err, bares) => {
        if(err) res.send(err);
        // Se não houver erros, retorna esta mensagem
        res.json(bares);
    });
}

/*
 * DELETE /bar/:id para deletar o bar dono do id.
 */
function deleteBar(req, res) {
    Bar.remove({_id : req.params.id}, (err, result) => {
      // Retorna esta mensagem
        res.json({ message: "Bar deletado com sucesso!", result });
    });
}

/*
 * PUT /bar/:id para atualizar o bar dono do id.
 */
function updateBar(req, res) {
    Bar.findById({_id: req.params.id}, (err, bares) => {
        if(err) res.send(err);
        Object.assign(bares, req.body).save((err, bares) => {
            if(err) res.send(err);
            // Retorna esta mensagem
            res.json({ message: 'Bar atualizado!', usuario });
        });
    });
}

//EXPORTA O MÓDULO
module.exports = { getBares, postBar, getBar, deleteBar, updateBar, getBares2 };
