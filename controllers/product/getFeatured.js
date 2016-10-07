var Responder = require('../../middleware/Responder');
var Product = require('../../models/products');

module.exports = function(req, res, next) {

	Product.getFeatured
		.then((products) => {
			console.log(products);
			Responder.respond(res, products);
		})
		.catch((err) => {
			console.log(err);
			Responder.interalError(next, err);
		});

} 