var Collection = require('../support/collection');
var Shop = new Collection('shops');
var should = require('should')
var fixture = require('../fixtures/shop')
var async = require('async')

describe('#Restful Shop', function(){
	before(function(done){
		async.series([
			function(callback) {
				console.log('should success signin')
				Shop.signin(callback)
			},
			function(callback) {
				console.log('should success create one first')
		    Shop.post({json:fixture.shop}, function(err, res, shop) {
		      res.statusCode.should.equal(200)
		      fixture.shop._id = shop._id;
					callback()
		    })	  
			}
		], done)
	})
	
	it('should success find id:'+fixture.shop._id, function(done) {
	  Shop.get({url:'/'+fixture.shop._id}, function(err, res, shop){
	  	res.statusCode.should.equal(200)
			shop.should.have.property("_id", fixture.shop._id)
			done()
	  })
	})
	
  it('should success find all', function(done){
		Shop.get({}, function(err, res, result){
	  	res.statusCode.should.equal(200)
			result.entities.length.should.above(0)
			result.total.should.be.above(0)
	    done()
		})
  })
	
	it('should success find with querystring', function(done){
	  Shop.get({qs:{status:{$ne:'removed'}, $or:[{name:{$regex:'1'}}, {code:{$regex:'1'}}]}}, function(err, res, result){
	  	res.statusCode.should.equal(200)
			result.entities.length.should.above(0)
			result.total.should.be.above(0)
	    done()
	  })
	})
	
	it('should success update', function(done){
	  fixture.shop.name += 'Update'
		Shop.put({url:'/'+fixture.shop._id, json:fixture.shop}, function(err, res, shop){
      res.statusCode.should.equal(200)
			done()
		})
	})
	
	after(function(done){
	  console.log('should success delete on (tag)')
		Shop.del({url:'/'+fixture.shop._id}, function(err, res) {
      res.statusCode.should.equal(200)
			done()
		})
	})
})