var Responder = require('../../middleware/Responder');
var Product = require('../../models/products');

module.exports = function(req, res, next) {

	var id = req.params.category_id;

	if(!id) return Responder.badRequest('category id not supplied.');

	Product.getByCategory(cat)
		.then((products) => {
			console.log(products);
			Responder.respond(res, products);
		})
		.catch((err) => {
			console.log(err);
			Responder.interalError(next, err);
		});

} 