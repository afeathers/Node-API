var Responder = require('../../middleware/Responder');

//Referencing the User model
var Company = require('../../models/companies');

module.exports = function(req, res, next) {

	Company.getAll
		.then((companies) => {
			console.log(companies);
			Responder.respond(res, companies);
		})
		.catch((err) => {
			console.log(err);
			Responder.interalError(next, err);
		});

} 