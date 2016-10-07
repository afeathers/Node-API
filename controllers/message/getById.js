var Responder = require('../../middleware/Responder');
var Message = require('../../models/messages');

module.exports = function(req, res, next) {

	var id = req.params.message_id;

	if(!id) return Responder.badRequest('message id not supplied.');

	Message.getById(id)
		.then((message) => {
			console.log(message);
			Responder.respond(res, message);
		})
		.catch((err) => {
			console.log(err);
			Responder.interalError(next, err);
		});

} 