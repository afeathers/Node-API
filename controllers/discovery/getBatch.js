var Responder = require('../../middleware/Responder');
var discovery = require('../../models/discovery');

module.exports = function(req, res, next) {

	var id = req.params.user_id;

	if(!id) return Responder.badRequest('user id not supplied.');

	Mineral.getById(id)
		.then((mineral) => {
			console.log(mineral);
			Responder.respond(res, mineral);
		})
		.catch((err) => {
			console.log(err);
			Responder.interalError(next, err);
		});

} 