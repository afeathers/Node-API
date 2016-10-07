var Responder = require('../../middleware/Responder');

//Referencing the mineral model
var User = require('../../models/users');

module.exports = function(req, res, next) {

	console.log(req);
	//Let's break down the pieces of the request into variables we can process.
	var username = req.body.username;
	var password = req.body.password;
	var first = req.body.first;
	var last = req.body.last;
	var type = req.body.type;
	var company = req.body.company;
	var avatar = req.body.avatar;
	var website = req.body.website;
	var interests = req.body.interests;
	

	if(!username || !password || !first || !last || !type ) return Responder.badRequest();
	// Let's use the create function from that model. 
	User.create(title, short_desc, long_desc)
		.then((user) => {
			console.log(user);
			Responder.respond(res, user);
		})
		.catch((err) => {
			console.log(err);
			Responder.interalError(next, err);
		});

} 