var Responder = require('../../middleware/Responder');
var Product = require('../../models/products');

module.exports = function(req, res, next) {

	var id = req.params.product_id;

	if(!id) return Responder.badRequest('product id not supplied.');

	Product.getById(id)
		.then((product) => {
			console.log(product);
			Responder.respond(res, product);
		})
		.catch((err) => {
			console.log(err);
			Responder.interalError(next, err);
		});

} 