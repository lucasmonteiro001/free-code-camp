/**
 * <p>
 * Finalidade da Classe: Finalidade da classe.
 * item de processo em autorização de fornecimento.
 * </p>
 *
 * <p>
 * Copyright: Copyright (c) Synergia - DCC - UFMG
 * </p>
 *
 * @author lucasmonteiro
 * @author Última modificação realizada por : lucasmonteiro $.
 * @version :: 30/06/2016#$.
 *
 */

var express = require('express');

var app = express();

module.exports = app;

app.port = 5000;

var cors = require('cors');

var bodyParser = require('body-parser');

/**
 * Permite acesso aos parametros na seguinte forma: req.param('nome do parametro')
 */
var requestParam = require('request-param');

/**
 * Pacote que contém várias validações. Nesse código, usamos para dar escape em caracteres HTML
 */
var validator = require('validator');

/**
 * Biblioteca de log assicrona, pois o console.log é síncrono
 */
var winston = require('winston');

/**
 * Gzip compressing can greatly decrease the size of the response body and hence increase the speed of a web app
 */
var compression = require('compression');

/**
 * Biblioteca para trabalhar com datas
 */
var moment = require('moment');
moment.locale("pt-br");

/**
 * Helmet is actually just a collection of nine smaller middleware functions that set security-related HTTP headers
 * https://www.npmjs.com/package/helmet
 * contentSecurityPolicy for setting Content Security Policy
 * dnsPrefetchControl controls browser DNS prefetching
 * frameguard to prevent clickjacking
 * hidePoweredBy to remove the X-Powered-By header
 * hpkp for HTTP Public Key Pinning
 * hsts for HTTP Strict Transport Security
 * ieNoOpen sets X-Download-Options for IE8+
 * noCache to disable client-side caching
 * noSniff to keep clients from sniffing the MIME type
 * xssFilter adds some small XSS protections
 */
var helmet = require('helmet');

var mid = require('./middlewares');

app.use(helmet());

app.use(mid.allowCors);

app.use(mid.logRequest);

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true}));

app.use(requestParam());

app.use(compression());

//defini a porta na qual a aplicação irá responder
app.listen(app.port);

winston.info('Executando o webservice na porta: ' + app.port);
