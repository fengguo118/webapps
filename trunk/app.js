/**
 * Module dependencies.
 */

var express = require('express')
	, Resource = require('express-resource')
  , fs = require('fs')
  , passport = require('passport')
  , logger = require('./app/utils/kit').getLogger()

/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

// Load configurations
// if test env, load example file
var env = process.env.NODE_ENV || 'development'
  , config = require('./config/config')[env]
  , auth = require('./config/middlewares/authorization')
  , mysql = require('mysql');

// Bootstrap db connection
// var db = mysql.createConnection(config.mysql)

// Bootstrap models
// var models_path = __dirname + '/app/models'
// fs.readdirSync(models_path).forEach(function (file) {
//   require(models_path+'/'+file)
// })

// bootstrap passport config
require('./config/passport')(passport, config)

//var privateKey = fs.readFileSync('sslcert/server.key');
//var certificate = fs.readFileSync('sslcert/server.crt');
//
//var credentials = {key: privateKey, cert: certificate};
//
//var app = express(credentials);
var app = express();

// express settings
require('./config/express')(app, config, passport)

// Bootstrap routes
require('./config/routes')(app, passport, auth)

// Start the app by listening on <port>
var port = process.env.PORT || 8888
app.listen(port)
logger.info('Express app started on port '+port)
//logger.info('log demo')


//Initializing logger 
// logger.init(app, passport)

// expose app
exports = module.exports = app