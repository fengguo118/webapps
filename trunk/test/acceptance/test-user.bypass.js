var Collection = require('../support/collection');
var User = new Collection('users');
var should = require('should')
var fixture = require('../fixtures/user')
var async = require('async')


describe('#Restful Users', function(){
	before(function(done){
		console.log('should success create one first')
		User.post({qs:{login:true}, json:fixture.tester}, function(err, res, user) {
      res.statusCode.should.equal(200)
      fixture.tester._id = user._id;
			done()
	  })
	})
	
	it('should success find all', function(done){
	  User.get({}, function(err, res, result){
	  	res.statusCode.should.equal(200)
			result.entities.length.should.above(0)
			result.total.should.be.above(0)
			console.log("All Users:", result.entities.length, result.total)
			done()
	  })
	})
	
	it('should success find with query string', function(done){
	  User.get({ qs:{status:{$ne:"removed"}, $or:[{username:{$regex:"ad"}}, {name:{$regex:"ad"}}] } }, function(err, res, result) {
	  	res.statusCode.should.equal(200)
			result.entities.length.should.above(0)
			result.total.should.be.above(0)
			console.log("QueryString OR ad Users:", result.entities.length, result.total)
			done()
	  })
	})
	
	it('should  success find staff', function(done){
	  User.get({ qs:{$where:"this.roles.indexOf('staff') > -1"} }, function(err, res, result) {
	  	res.statusCode.should.equal(200)
			result.entities.length.should.above(0)
			result.total.should.be.above(0)
			console.log("QueryString OR ad Users:", result.entities.length, result.total)
			done()
	  })
	})
	
	it('should success find all which not removed', function(done){
	  User.get({qs:{status:{$ne:"removed"}}}, function(err, res, result){
	  	res.statusCode.should.equal(200)
			result.entities.length.should.above(0)
			result.total.should.be.above(0)
			console.log("Unremoved Users:", result.entities.length, result.total)
			done()
	  })
	})
	
	it('should success find first 5', function(done) {
		async.times(5, function(n, next){
			var user = {}
			Object.keys(fixture.tester).forEach(function(key){
				user[key] = fixture.tester[key]
			})
			delete user._id
			User.post({json:user}, function(err, res, user){
				next(err, user)
			})
		}, function(err, entities){
		  User.get({qs:{limit:5}}, function(err, res, result){
		  	res.statusCode.should.equal(200)
				result.entities.should.have.lengthOf(5)
				result.total.should.be.above(5)
				done()
		  })
		})
	})
	after(function(done){
		console.log('should success tag remove user')
	  User.del({url:'/'+fixture.tester._id}, function(err, res, user) {
      res.statusCode.should.equal(200)
			done()
	  })
	})
})