var Responder = require('../../middleware/Responder');

//Referencing the User model
var User = require('../../models/users');

module.exports = function(req, res, next) {

	var id = req.params.user_id;

	if(!id) return Responder.badRequest('user id not supplied.');

	User.getById(id)
		.then((user) => {
			console.log(user);
			Responder.respond(res, user);
		})
		.catch((err) => {
			console.log(err);
			Responder.interalError(next, err);
		});

} 