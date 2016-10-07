var Responder = require('../../middleware/Responder');
var Company = require('../../models/companies');

module.exports = function(req, res, next) {

	var id = req.params.user_id;

	if(!id) return Responder.badRequest('user id not supplied.');

	Company.getById(id)
		.then((companies) => {
			console.log(companies);
			Responder.respond(res, companies);
		})
		.catch((err) => {
			console.log(err);
			Responder.interalError(next, err);
		});

} 