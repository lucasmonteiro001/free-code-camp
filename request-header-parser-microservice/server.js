/**
 * Author: Lucas Monteiro
 * GitHub: https://github.com/lucasmonteiro001
 */
var app = require('./server_config');
var mid = require('./middlewares');
var moment = require('moment');

moment.locale('en');

// / Load jsdom, and create a window.
// jsdom = require("jsdom").jsdom;
// doc = jsdom();
// window = doc.defaultView;
// $ = jQuery = require('jquery')(window);
// global.document = doc;
// global.jQuery = global.$ = require('jquery');

// Escape and Trim every parameter
app.use(mid.escapeAndTrim);

// Renders index if root is accessed
app.get('/api/whoami', function(req, res) {

    var userAgent = req.headers["user-agent"];
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    var lang = req.headers["accept-language"];

    var first = userAgent.indexOf('(');
    var last = userAgent.indexOf(')');
    var software = userAgent.substring(first + 1, last);

    // Gets only the first language accepted
    lang = lang.split(",")[0];

    res.json({
        ipaddress: ip,
        language: lang,
        software: software
    });
    
});

/**
 * If route is not defined, return a message
 */
app.get('*', function(req, res, next){
    res.status(200).json({msg: "Invalid route. You should access https://freecodecamp--request-header.herokuapp.com/api/whoami"});
});
