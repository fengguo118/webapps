var Collection = require('../support/collection')
var User = new Collection('users')
var Shop = new Collection('shops')
var Staff = new Collection('staffs')
var async = require('async')
	, _ = require('underscore')
var user, shop, shop2, staff

describe('#Restful Staff', function(){
  before(function(done){
		console.log("should success create one")
    async.series([
			function(callback) {
				User.signin(callback)
			},
			function(callback) {
				User.get({qs:{phone:'18912345678'}}, function(err, res, body) {
					res.statusCode.should.equal(200)
					callback(err, body.entities[0])
				})
			},
			function(callback) {
				Shop.get({qs:{code:'1001'}}, function(err, res, body) {
					res.statusCode.should.equal(200)
					callback(err, body.entities[0])
				})
			},
			function(callback) {
				Shop.get({qs:{code:'1002'}}, function(err, res, body) {
					res.statusCode.should.equal(200)
					callback(err, body.entities[0])
				})
			}
		],function(err, results){
			if(err) return done(err)
			user = results[1]
			shop = results[2]
			shop2 = results[3]
			staff = {
				title:"cashier",
				user:user,
				shop:shop._id
			}
			Shop.url = Shop.url+"/"+shop._id+"/staffs"
			Staff.post({json:staff}, function(err, res, body){
				res.statusCode.should.equal(200)
				staff = _.extend(staff, body)
				done()
			})
		})
  })
	
	it('should success add new user and new staff', function(done){
		var newUser = require('../fixtures/user').tester
		newUser.password = "123456"
	  var staff2 = {
			user: newUser,
			shop:shop._id
	  }
		Shop.post({json:staff2}, function(err, res, body){
			res.statusCode.should.equal(200)
			done()
		})
	})
	
	it('should success find by querystring /staffs', function(done){
		Staff.get({qs:{title:'cashier'}}, function(err, res, body){
			res.statusCode.should.equal(200)
			body.total.should.above(0)
			body.entities.length.should.above(0)
			body.entities[0].user.should.have.property('phone','18912345678')
		  done()
		})
	})
	
	it('should success find all /shops/:id/staffs', function(done){
		var staff2 = _.clone(staff)
		delete staff2._id
		async.times(10, function(n, next){
			Shop.post({json:staff2}, function(err, res, body){
				res.statusCode.should.equal(200)
				next(err, staff2)
			})
		}, function(err, staffs){
			staffs.length.should.equal(10)
		})		
		Shop.get({}, function(err, res, body){
			res.statusCode.should.equal(200)
			body.total.should.above(0)
			body.entities.length.should.equal(10)
		  done()
		})
	})
	
	it('should success update /shops/:id/staffs/:id', function(done){
		Shop.put({url:"/"+staff._id, json:{title:"manager"}}, function(err, res){
			res.statusCode.should.equal(200)
			Shop.get({url:"/"+staff._id}, function(err, res, body){
				res.statusCode.should.equal(200)
				body.should.have.property('title', 'manager')
				done()
			})
		})
	})
	
	it('should success update name', function(done){
		
		Staff.put({url:"/"+staff._id, json:{user:{name:"abc"}}}, function(err, res){
			res.statusCode.should.equal(200)
			Staff.get({url:"/"+staff._id}, function(err, res, body){
				res.statusCode.should.equal(200)
				body.user.should.have.property('name', 'abc')
				done()
			})
		})
	})
	
	it.only('should success update shop', function(done){
		Staff.put({url:"/"+staff._id, json:{shop:shop2._id}}, function(err, res){
			res.statusCode.should.equal(200)
			Staff.get({url:"/"+staff._id}, function(err, res, body){
				res.statusCode.should.equal(200)
				body.shop.should.have.property('code', shop2.code)
				done()
			})
		})
	})
	
	after(function(done){
	  console.log('remove staff')
		Staff.del({url:"/"+staff._id}, function(err, res){
			res.statusCode.should.equal(200)
			done()
		})
	})
})