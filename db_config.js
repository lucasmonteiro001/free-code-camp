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

//configuração de string de conexao com banco MongoDB



// var db_string_conexao = "mongodb://bambam:27017/local";
var db_string_conexao = "mongodb://localhost:27017/local";

//responsavel por fazer a conexãoo com o banco usando a string de conexao
var mongoose = require('mongoose').connect(db_string_conexao);

//variavel db para chamar conexao com banco para interagir com banco
var db =  module.exports = mongoose.connection;

