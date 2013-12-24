
/*
 *	Query String enhancement
 *	support multilevel qurey string
*/

function is(type, obj) {
    var clas = Object.prototype.toString.call(obj).slice(8, -1);
    return obj !== undefined && obj !== null && clas === type;
}

function deepCopy(src) {
	var dest = {}
	Object.keys(src).forEach(function(key){
		if(is('Array', src[key])) {
			dest[key] = src[key].map(deepCopy)
		} else if(is('Object', src[key])){
			dest[key] = deepCopy(src[key])
		} else {
			dest[key] = src[key]
		}
	})
	return dest
}

exports.strong = function() {
	return function(req, res, next){
		if(req.query) {
			/* 
			* Must copy, querystring convert Object just 2 level.
			* Baisc type such as string, number, boolean, regex will be OK
			* Objects and Array contains Basic type is OK
			* Objects and Arrays contains Object WILL NOT BE OK.
			* 3 level above Object will not constructor Object native function.
			*/
			req.query = deepCopy(req.query)
			
			req.pageLimit = req.param('limit') > 0 ? req.param('limit') : 10
			req.pageIndex = req.param('page') > 1 ? req.param('page')-1 : 0

      req.options = req.param('options')

			delete req.query.limit
			delete req.query.page

			if(req.query.withall) {
				delete req.query.withall
			} else if(!req.query.status){
				req.query.status = {$ne:"removed"}
			}
		}
		next()
	}
} 
