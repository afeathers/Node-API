var Responder = require('../../middleware/Responder');

//Referencing the mineral model
var Company = require('../../models/companies');

module.exports = function(req, res, next) {

	console.log(req);
	//Let's break down the pieces of the request into variables we can process.
	var title = req.body.title;
	var short_desc = req.body.short_desc;
	var long_desc = req.body.long_desc;

	if(!title || !short_desc || !long_desc ) return Responder.badRequest();
	// Let's use the create function from that model. 
	Company.create(title, short_desc, long_desc)
		.then((mineral) => {
			console.log(mineral);
			Responder.respond(res, mineral);
		})
		.catch((err) => {
			console.log(err);
			Responder.interalError(next, err);
		});

} 