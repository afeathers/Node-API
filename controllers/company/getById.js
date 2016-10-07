var Responder = require('../../middleware/Responder');
var Company = require('../../models/companies');

module.exports = function(req, res, next) {

	var id = req.params.company_id;

	if(!id) return Responder.badRequest('company id not supplied.');

	Company.getById(id)
		.then((company) => {
			console.log(company);
			Responder.respond(res, company);
		})
		.catch((err) => {
			console.log(err);
			Responder.interalError(next, err);
		});

} 