var Collection = require('../support/collection')
var Member = new Collection('members')
var Staff = new Collection('staffs')
var Settlement = new Collection('settlements')
var async = require('async')
	, _ = require('underscore');
var member, agent, settlement

describe('#Restful Settlement', function(){
  before(function(done){
		console.log("should success create one")
    async.series([
			function(callback) {
				Staff.signin(callback)
			},
			function(callback) {
				Staff.get({code:'10001'}, function(err, res, body) {
					res.statusCode.should.equal(200)
					callback(err, body.entities[0])
				})
			},
			function(callback) {
				Member.get({code:'10001'}, function(err, res, body) {
					res.statusCode.should.equal(200)
					callback(err, body.entities[0])
				})
			}
		],function(err, result){
			if(err) return done(err)
			agent = result[1]
			member = result[2]
			settlement = {
				type:'prepay',
				amount: 25000,
				// agent:agent._id,
				member:member._id
			}
			Settlement.post({json:settlement}, function(err, res, body){
				res.statusCode.should.equal(200)
				settlement = _.extend(settlement, body)
				Member.get({code:'10001'}, function(err, res, body){
					res.statusCode.should.equal(200)
					body.total.should.above(0)
					body.entities.length.should.above(0)
					body.entities[0].balance.should.not.below(settlement.amount)
				  done()
				})
			})
		})
  })
	
	it('should success find all /settlements', function(done){
		var settlement2 = _.clone(settlement)
		delete settlement2._id
		async.times(10, function(n, next){
			Settlement.post({json:settlement2}, function(err, res, body){
				res.statusCode.should.equal(200)
				next(err, settlement2)
			})
		}, function(err, settlements){
			settlements.length.should.equal(10)
			Settlement.get({}, function(err, res, body){
				res.statusCode.should.equal(200)
				body.total.should.above(0)
				body.entities.length.should.equal(10)
				body.entities[0].member.user.should.have.property('_id')
				body.entities[0].agent.should.have.property('_id')
				done()
			})
		})
	})
	
	after(function(done){
	  console.log('remove settlement')
		Settlement.del({url:"/"+settlement._id}, function(err, res){
			res.statusCode.should.equal(200)
			done()
		})
	})
})