var Responder = require('../../middleware/Responder');

//Referencing the User model
var User = require('../../models/users');

module.exports = function(req, res, next) {

	User.getUsers
		.then((user) => {
			console.log(user);
			Responder.respond(res, user);
		})
		.catch((err) => {
			console.log(err);
			Responder.interalError(next, err);
		});

} 