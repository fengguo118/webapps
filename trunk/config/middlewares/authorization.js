
/*
 *  Generic require login routing middleware
 */

exports.requiresLogin = function (req, res, next) {
  if (!req.isAuthenticated()) {
    return res.send(401)
  }
  next()
};


/*
 *  User authorizations routing middleware
 */

exports.user = {
    hasAuthorization : function (req, res, next) {
      console.log('hasAuthorization-tsq:',req.user,"+",req.profile)
      if (!req.user) {
				console.log("User Auth:",req.user)
        return res.send(401)
      }
      next()
    }
}

/*
 *  Shop authorizations routing middleware
 */

exports.shop = {
  hasAuthorization : function (req, res, next) {
    if (!req.user || (req.user.roles.indexOf('admin') === -1)) {
			console.log("Shop Auth:",req.user)
      return res.send(401)
    }
    next()
  }
}

/*
 *  Staff authorizations routing middleware
 */

exports.staff = {
  hasAuthorization : function (req, res, next) {
    if (!req.user || (req.user.roles.indexOf('admin') === -1
				&& req.user.roles.indexOf('staff') === -1) ) {
			console.log("Staff Auth:", req.user)
      return res.send(401)
    }
    next()
  }
}

/*
 *  Member authorizations routing middleware
 */

exports.member = {
    hasAuthorization : function (req, res, next) {
	    if (!req.user) {
				console.log("Member Auth:", req.user)
	      return res.send(401)
	    }
	    next()
    }
}
