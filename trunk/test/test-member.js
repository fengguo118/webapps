require('../server.js')
var mongoose = require('mongoose')
var async = require('async')
var User = mongoose.model('User')
var Shop = mongoose.model('Shop')
var Member = mongoose.model('Member')
var user
	,	shop
	, member

describe('#Member Model', function(){
	before(function(done){
	  async.parallel([
			function(callback) {
				user = new User(require('./fixtures/user').member)
				user.save(callback)
			},
			function(callback) {
				Shop.findOne({code:"1001"}).exec(function(err, s){
					shop = s
					callback(err, s)	
				})
			}
		], function(err, result){
			console.log("should success create one")
	    member = new Member()
			member.user = user
			member.shop = shop
			member.save(done)
		})
	})
	
  it('should success find all', function(done){
		Member
		.find(function(err, members){
			members.length.should.above(0)
			done()
		})
  })
	
	it('should success find one', function(done){
	  Member
		.findOne({_id:member._id})
		.populate('user')
		.populate('shop')
		.exec(function(err, result){
			result.should.have.property("user")
			result.user.should.have.property("username", user.username)
			result.should.have.property("shop")
			result.shop.should.have.property("code", shop.code)
			done()
		})
	})
		
	it('should success update', function(done){
	  member.status = 'removed'
		member.removedAt = Date.now()
		member.save(done)
	})
})