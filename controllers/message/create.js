var Responder = require('../../middleware/Responder');

//Referencing the message model
var Message = require('../../models/messages');

module.exports = function(req, res, next) {

	console.log(req);
	//Let's break down the pieces of the request into variables we can process.
	var content = req.body.content;
	var timestamp = req.body.timestamp;

	if(!title || !short_desc || !long_desc ) return Responder.badRequest();
	// Let's use the create function from that model. 
	Message.create(content, timestamp)
		.then((message) => {
			console.log(message);
			Responder.respond(res, message);
		})
		.catch((err) => {
			console.log(err);
			Responder.interalError(next, err);
		});

} 