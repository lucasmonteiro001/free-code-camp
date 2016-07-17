/**
 * Author: Lucas Monteiro
 * GitHub: https://github.com/lucasmonteiro001
 */
var app = require('./server_config');
var mid = require('./middlewares');
var db;
var urls = undefined;

//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.

//(Focus on This Variable)
// export MONGOLAB_URI="mongodb://root:root@ds049935.mlab.com:49935/urls-database"
var url = process.env.MONGOLAB_URI;
//(Focus on This Variable)

// Use connect method to connect to the Server
MongoClient.connect(url, function (err, database) {

    if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
    }
    else {
        console.log('Connection established to', url);
        db = database;
        urls = database.collection('urls');
        //Close connection
        // db.close();
    }
});

// Escape and Trim every parameter
app.use(mid.escapeAndTrim);

app.get('/', function (req, res) {
    res.render('index.html'); // absolute path is inferred from pages/ folder (see at server_config.js)
});

app.get('/:short_url', function(req, res) {

    var short_url = req.param('short_url');
    var host = req.protocol + '://' + req.get('host') + '/';

    if(urls) {

        urls.findOne({short_url: host + short_url}).then(function(db_url) {

            // if no short_url was found, return an error
            if(db_url === null) {
                res.json({
                    error: "This url is not on the database."
                });
            }
            else { // If url found, redirect to the site
                console.log(db_url.url);
                res.redirect(db_url.url);
            }

        });
    }

    // res.json({s:short_url});
});

app.get('/new/*', function(req, res) {

    var urlRegex = "(https?:\/\/){1}[a-zA-Z0-9u00a1-\uffff0-]{2,}\\.[a-zA-Z0-9u00a1-\uffff0-]{2,}(\S*)";
    var url = req.params[0];
    var host = req.protocol + '://' + req.get('host') + '/';

    // If passed url is a valid url, save it to the database
    if(url.match(urlRegex) !== null) {

        if(urls) {
            // gets number of registers in the collection
            urls.find({}).count().then(function(count) {

                // searches if the url exists, if yes, returns it
                urls.findOne({url: url}).then(function(db_url) {

                    // If url is null, no document was found
                    if(db_url === null) {
                        // Insert a new register with the new count
                        urls.insert({ url: url,  short_url: host + (count + 1)}, function(err) {
                            if(err) {
                                console.error(err);
                            }
                            else {
                                res.json({
                                    original_url: url,
                                    short_url: host + (count + 1)
                                });
                            }
                        });
                    }
                    else { // if the url is in the database, return it
                        res.json({
                            original_url: url,
                            short_url: db_url.short_url
                        });
                    }

                });
            });
        }

    }
    else {
        res.json({
            error: "Wrong url format, make sure you have a valid protocol and real site."
        });
    }


});

/**
 * If route is not defined, return a message
 */
app.get('*', function(req, res, next){
    res.status(200).json({msg: "Invalid route. You should access https://freecodecamp--request-header.herokuapp.com/api/whoami"});
});
