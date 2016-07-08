/**
 * @author lucasmonteiro
 * @author Última modificação realizada por : lucasmonteiro $.
 * @version :: 30/06/2016#$.
 *
 */
var app = require('./server_config');
var mid = require('./middlewares');

app.get('/cidades/', mid.escapeAndTrim, function(req, res) {
    var query = req.query;

    res.json("Hello world from /cidades");
});

/**
 * Se não encontrar nenhuma rota, quer dizer que ela é inválida. Logo, retorna um 404
 */
app.get('*', function(req, res, next){
    res.status(404).end("Not Found!");
});
