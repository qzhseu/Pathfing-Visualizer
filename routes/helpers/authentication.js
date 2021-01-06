const { User } = require('../../models/user')

module.exports = {
	authenticate: (req, res, next) => {
		if (req.session.user) {
			User.findById(req.session.user.id).then((user) => {
				if (!user) {
					return Promise.reject("Do no exist")
				} else {
					req.user = user
					next()
				}
			}).catch((error) => {
				res.status(401).send("Unauthorized")
			})
		} else {
			res.status(401).send("Unauthorized")
		}
	},

}