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
let Cupom = require('../models/cupom');

/*
 * GET / retorna todos os bares.
 */
function getCupons(req, res) {
    // Retorna todos os cupons
    let query = Cupom.find({});
    query.exec((err, cupons) => {
        if(err) res.send(err);
        // Se não houver erros, retorna todos bares
        res.json(cupons);
    });
}

function getCupons2(req, res) {
    // Retorna todos os cupons
    let query = Cupom.find({});
    query.exec((err, cupons) => {
        if(err) res.send(err);
        // Se não houver erros, retorna todos bares
        let js = "{ 'cupons':"+cupons+"}";
        res.send(js);
    });
}
/*
 * POST / insere um novo bar.
 */
function postCupom(req, res) {
    // Cria um novo cupom
    var newCupom = new Cupom(req.body);
    // Salva no Mongo
    newCupom.save((err, cupons) => {
        if(err) {
            res.send(err);
        }
        else {
          // Se não houver erros, retorna esta mensagem
            res.json({ message: "Cupom adicionado com sucesso!", bares });
        }
    });
}

/*
 * GET /cupom/:id retotna o cupom dono do id.
 */
function getCupom(req, res) {
    Cupom.findById(req.params.id, (err, cupons) => {
        if(err) res.send(err);
        // Se não houver erros, retorna esta mensagem
        res.json(cupons);
    });
}

/*
 * DELETE /cupom/:id para deletar o cupom dono do id.
 */
function deleteCupom(req, res) {
    Cupom.remove({_id : req.params.id}, (err, result) => {
      // Retorna esta mensagem
        res.json({ message: "Cupom deletado com sucesso!", result });
    });
}

/*
 * PUT /cupom/:id para atualizar o cupom dono do id.
 */
function updateCupom(req, res) {
    Cupom.findById({_id: req.params.id}, (err, cupons) => {
        if(err) res.send(err);
        Object.assign(cupons, req.body).save((err, cupons) => {
            if(err) res.send(err);
            // Retorna esta mensagem
            res.json({ message: 'Cupom atualizado!', cupom });
        });
    });
}

//EXPORTA O MÓDULO
module.exports = { getCupons, postCupom, getCupom, deleteCupom, updateCupom, getCupons2 };
