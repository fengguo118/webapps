var Collection = require('../support/collection')
var User = new Collection('users')
var Shop = new Collection('shops')
var Member = new Collection('members')
var async = require('async')
	, _ = require('underscore')
var user, shop, member

describe('#Restful Member', function(){
  before(function(done){
		console.log("should success create one")
    async.series([
			function(callback) {
				User.signin(callback)
			},
			function(callback) {
				var member = require('../fixtures/user').member
				callback(null, member)
			},
			function(callback) {
				Shop.get({code:'1001'}, function(err, res, body) {
					res.statusCode.should.equal(200)
					callback(err, body.entities[0])
				})
			}
		],function(err, result){
			if(err) return done(err)
			user = result[1]
			shop = result[2]
			member = {
				user:user,
				shop:shop._id
			}
			Shop.url = Shop.url+"/"+shop._id+"/members"
			Member.post({json:member}, function(err, res, body){
				res.statusCode.should.equal(200)
				member = _.extend(member, body)
				done()
			})
		})
  })
	
	it('should success find all /shops/:id/members', function(done){
		var member2 = _.clone(member)
		delete member2._id
		async.times(10, function(n, next){
			Shop.post({json:member2}, function(err, res, body){
				res.statusCode.should.equal(200)
				next(err, member2)
			})
		}, function(err, members){
			members.length.should.equal(10)
		})		
		Shop.get({}, function(err, res, body){
			res.statusCode.should.equal(200)
			body.total.should.above(0)
			body.entities.length.should.equal(10)
		  done()
		})
	})
	
	it('should success find by querystring /members', function(done){
		Member.get({qs:{level:'VIP'}}, function(err, res, body){
			res.statusCode.should.equal(200)
			body.total.should.above(0)
			body.entities.length.should.above(0)
		  done()
		})
	})
	
	it('should success update /shops/:id/members/:id', function(done){
		Shop.put({url:"/"+member._id, json:{level:"diamond"}}, function(err, res){
			res.statusCode.should.equal(200)
			Shop.get({url:"/"+member._id}, function(err, res, body){
				res.statusCode.should.equal(200)
				body.should.have.property('level', 'diamond')
				done()
			})
		})
	})
	
	it('should success update user name', function(done){
		Member.put({url:"/"+member._id, json:{user:{name:"abc"}}}, function(err, res){
			res.statusCode.should.equal(200)
			Member.get({url:"/"+member._id}, function(err, res, body){
				res.statusCode.should.equal(200)
				body.user.should.have.property('name', 'abc')
				done()
			})
		})
	  
	})
	it('should success update /members/:id', function(done){
		Member.put({url:"/"+member._id, json:{status:"removed"}}, function(err, res){
			res.statusCode.should.equal(200)
			done()
		})
	})
	
	after(function(done){
	  console.log('remove member')
		Member.del({url:"/"+member._id}, function(err, res){
			res.statusCode.should.equal(200)
			done()
		})
	})
})