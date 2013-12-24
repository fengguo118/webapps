/**
 * Module dependencies.
 */

var express = require('express')
  , RedisStore = require('connect-redis')(express)
  , flash = require('connect-flash')
  , helpers = require('view-helpers')
	, qs = require('./middlewares/querystrong')
  , log4js = require('log4js')
  , logger = require('../app/utils/kit').getLogger()

module.exports = function (app, config, passport) {

  app.set('showStackError', true)
  // should be placed before express.static
  app.use(express.compress({
    filter: function (req, res) {
      return /json|text|javascript|css/.test(res.getHeader('Content-Type'));
    },
    level: 9
  }))
  app.use(express.favicon())
  app.use(express.static(config.root + '/public/app'))

  // don't use logger for test env
//  if (process.env.NODE_ENV !== 'test') {
//    app.use(express.logger('dev'))
//  }

  app.use(log4js.connectLogger(logger, { level: 'auto' }));
  // set views path, template engine and default layout
  // app.set('views', config.root + '/app/views')
  // app.set('view engine', 'jade')
  
  // enable jsonp
  app.enable("jsonp callback")

  app.configure(function () {
    // dynamic helpers
    app.use(helpers(config.app.name))

    // cookieParser should be above session
    app.use(express.cookieParser())

    // bodyParser should be above methodOverride
    app.use(express.bodyParser({
      keepExtensions: true,
      uploadDir: __dirname + '/tmp',
      limit: '2mb'
    }));
    app.use(express.methodOverride())

		// express/redis session storage
    app.use(express.session({
      secret: 'sprint2',
      store: new RedisStore(config.redis)
    }))

    // connect flash for flash messages
    app.use(flash())

    //去掉IE浏览器的缓存！
    app.use(function noCache(req, res, next){
      res.header("Cache-Control", "no-cache, no-store, must-revalidate");
      res.header("Pragma", "no-cache");
      res.header("Expires",0);
      next();
    })

		// strong query string
		app.use(qs.strong())
    // use passport session
    app.use(passport.initialize())
    app.use(passport.session())

		/**
		 * CORS support.
		 */    
		app.all('*', function(req, res, next){
			var origin = req.get('Origin');
//      console.log('origin:',origin)
		  if (!origin || -1 === config.Access_Control_Allow_Origins.indexOf(origin)){
//        console.log('!!!!!!!!!!!!!!!!:',origin)
        return next();
      }
		  // use "*" here to accept any origin
		  res.set('Access-Control-Allow-Origin', origin);
		  res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
		  res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
			res.set('Access-Control-Allow-Credentials', 'true')
//      console.log('@@@@@@@@@@@@@@@@@@@',origin)
		  // res.set('Access-Control-Allow-Max-Age', 3600);
		  if ('OPTIONS' == req.method) return res.send(200);
		  next();
		});
		
    // routes should be at the last
    app.use(app.router)

    // assume "not found" in the error msgs
    // is a 404. this is somewhat silly, but
    // valid, you can do whatever you like, set
    // properties, use instanceof etc.
    app.use(function(err, req, res, next){
      // treat as 404
      if (~err.message.indexOf('not found')) return next()

      // log it
      console.error(err.stack)

      // error page
      // res.status(500).render('500', { error: err.stack })
			res.send(500)
    })

    // assume 404 since no middleware responded
    app.use(function(req, res, next){
			res.send(404);
      // res.status(404).render('404', { url: req.originalUrl, error: 'Not found' })
    })

  })
}
