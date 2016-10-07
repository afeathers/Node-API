var Responder = require('../../middleware/Responder');
var Product = require('../../models/products');

module.exports = function(req, res, next) {

	console.log(req);
	//Let's break down the pieces of the request into variables we can process.
	var title = req.body.title;
	var short_desc = req.body.short_desc;
	var long_desc = req.body.long_desc;

	if(!title || !short_desc || !long_desc ) return Responder.badRequest();
	// Let's use the create function from that model. 
	Product.create(title, short_desc, long_desc)
		.then((product) => {
			console.log(product);
			Responder.respond(res, product);
		})
		.catch((err) => {
			console.log(err);
			Responder.interalError(next, err);
		});

} 