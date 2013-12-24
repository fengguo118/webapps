if(process.env.NODE_ENV !== 'test') {
	require('../../server.js')
}
var request = require('request');

function Collection(resource) {
  this.resource = resource;
  this.urlObj = {
    protocol: 'http',
    hostname: process.env.NODE_HOST || 'localhost',
    port: process.env.PORT || '3000',
    pathname: '/' + resource
  }
  this.url = require('url').format(this.urlObj);
  this.json = true;
}

Collection.prototype.request = function (options, fn) {
  var url = this.url;

  options.url = url + (options.url || '');
  options.json = options.json || this.json;
	options.jar = true;
  request(options, fn);
}

Collection.prototype.post = function (options, fn) {
  options.method = 'POST';
  this.request(options, fn);
}

Collection.prototype.get = function (options, fn) {
  options.method = 'GET';
  this.request(options, fn);
}

Collection.prototype.put = function (options, fn) {
  options.method = 'PUT';
  this.request(options, fn);
}

Collection.prototype.del = function (options, fn) {
  options.method = 'DELETE';
  this.request(options, fn);
}

Collection.prototype.signin = function(userInfo, fn) {
	if(typeof userInfo === 'function') {
		fn = userInfo
		userInfo = require('../fixtures/user').tester
	}
  this.urlObj.pathname = '/users/session';
  var url = require('url').format(this.urlObj);
  request({url: url, json: userInfo, method: 'POST', jar:true}, fn)
}

Collection.prototype.signout = function (fn) {
  this.urlObj.pathname = '/users/signout';
  var url = require('url').format(this.urlObj);
  request({url: url, json: {}, method: 'POST'}, fn);
}

exports = module.exports = Collection;
