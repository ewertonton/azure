/*
*********************************************
*   BORA TOMAR UMA - API RESTFUL
*********************************************
*   @author Ewerton "Tonton" Menezes
*   @contact eweexy@gmail.com
*   @versão: 1.0.0
*********************************************
*   node.js
*   node-restful
*   nodemon
*   express
*   mongodb
*   mongoose
*   body-parser
*   bluebird
*   morgan
*   jsonwebtoken
*********************************************
*/
// DEPENDENCIAS
let express = require('express');
let http = require('http');
let mongoose = require('mongoose');
let promise = require ( "bluebird" );
let bodyParser = require('body-parser');
let morgan = require('morgan');
let jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

// VARIÁVEIS
let uri = 'mongodb://bora:bora1234@ds031257.mlab.com:31257/bora';
let port = 1001;
let app = express();
let router = express.Router();
let usuario = require('./routes/usuario');
let bar = require('./routes/bar');
let cupom = require('./routes/cupom');

// CONECTAR AO MONGODB
mongoose.Promise = promise;
mongoose.connect(uri, function onMongooseError(err) {
    if (err) throw err;
});

// EXPRESS
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    if ('OPTIONS' === req.method) {
        res.status(200).end();
    } else {
        next();
    }
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));
app.use(morgan('dev'));
app.use('/api', router);
/*
 * SET / seta variáveis.
 */
app.set('segredo', 'b0r@');
app.set('router', router);

/*
 * GET / retorna com mensagem.
 */
app.get("/", (req, res) => res.json({ message: "Bem vindo ao Bora Tomar Uma API" }));

/*
 * ROUTE / chama o comando responsável.
 */
// AUTENTICAÇÃO
app.route("/login")
    .post(usuario.postAutenticacao);

 // USUARIO
 app.route("/usuario3")
     .get(usuario.getUsuarios3);
 app.route("/usuario2")
     .get(usuario.getUsuarios2);
app.route("/usuario")
    .get(usuario.getUsuarios)
    .post(usuario.postUsuario);
app.route("/usuario/:id")
    .get(usuario.getUsuario)
    .delete(usuario.deleteUsuario)
    .put(usuario.updateUsuario);

// BAR
app.route("/bar2")
    .get(bar.getBares2);
app.route("/bar")
    .get(bar.getBares)
    .post(bar.postBar);
app.route("/bar/:id")
    .get(bar.getBar)
    .delete(bar.deleteBar)
    .put(bar.updateBar);

// CUPOM
app.route("/cupom2")
    .get(cupom.getCupons2)
app.route("/cupom")
    .get(cupom.getCupons)
    .post(cupom.postCupom);
app.route("/cupom/:id")
    .get(cupom.getCupom)
    .delete(cupom.deleteCupom)
    .put(cupom.updateCupom);

/*
* INICIA O SERVIDOR.
*/
http.createServer(app)
  .listen(port, function () {
    console.log('app rodando na porta ' + port);
  });
