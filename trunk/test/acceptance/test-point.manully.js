var Collection = require('../support/collection')
var Member = new Collection('members')
var Staff = new Collection('staffs')
var PointLog = new Collection('pointlogs')
var async = require('async')
	, _ = require('underscore');
var member, agent, pointLog

describe('#Restful accumulate point manully', function(){
  before(function(done){
		async.series([
			function(callback){
				Staff.signin(callback)
			},
			function(callback) {
				Member.get({code:'10001'}, function(err, res, body) {
					res.statusCode.should.equal(200)
					callback(err, body.entities[0])
				})
			},
			function(callback) {
				Staff.get({code:'10001'}, function(err, res, body) {
					res.statusCode.should.equal(200)
					callback(err, body.entities[0])
				})
			}
		], function(err, results){
			if(err) done(err)
			member = results[1]
			agent = results[2]
			done()
		})
  })
	
	it('should success accumlate point manully', function(done){
		var pl = {
			point: 32000, 
			member: member._id,
			agent:agent._id
		}
		PointLog.post({json:pl}, function(err, res, body){
			res.statusCode.should.equal(200)
			pointLog = _.extend(pl, body)
			Member.get({code:'10001'}, function(err, res, body){
				res.statusCode.should.equal(200)
				body.total.should.above(0)
				body.entities.length.should.above(0)
				body.entities[0].point.should.not.below(pointLog.postPoint)
				body.entities[0].totalPoint.should.not.below(pointLog.postTotalPoint)
			  done()
			})
		})
	})
})