var redis = require('redis')
var publish = redis.createClient()
	,	subscribe = redis.createClient()
	, troop = require('mongoose-troop')

module.exports = exports = function(schema, options){
	var opt = {
		publish: publish,
		subscribe: subscribe
	}
	options = options || {}
	Object.keys(options).forEach(function(key){
		opt[key] = options[key] 
	})
	troop.pubsub(schema, opt)
}