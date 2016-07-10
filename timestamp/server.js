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
app.get('/', function(req, res) {

    res.sendFile('index.html'); // absolute path is inferred from pages/ folder (see at server_config.s)
    
});

// Display time formatted
app.get('/:time', function(req, res) {

    var time = req.param('time');
    var date;
    var unixtimestamp;
    var formattedDate;

    time = Number(time);

    // passes if time is unix timestamp
    if(!isNaN(time)) {

        date = moment(time);

        unixtimestamp = time;

        formattedDate = date.format('MMMM, DD YYYY');

    }
    else { // if time is not a number

        time = req.param('time');

        date = moment(new Date(time).toISOString());

        // if no convertion was possible, return null
        if(date.format() === "Invalid date") {

            unixtimestamp = null;
            formattedDate = null;
        }
        else {

            unixtimestamp = date.format('x');
            formattedDate = date.format('MMMM, DD YYYY');
        }
    }

    res.json({
        unix: unixtimestamp,
        natural: formattedDate
    });

});

/**
 * If route is not defined, return 404 status
 */
app.get('*', function(req, res, next){
    res.status(404).end("Not Found!");
});
