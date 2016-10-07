/**
 * Responder
 *
 */

var errors = require('../errors');

module.exports = {

	// Errors
	badRequest(next, message) {
		return next(errors.badRequest(message));
	},

	unauthorized(next, message) {
		return next(errors.unauthorized(message));
	},

	internalError(next, message) {
		return next(errors.internalError(message));
	},

	invalidToken(next, message) {
		return next(errors.invalidToken(message));
	},

	notFound(next, message) {
		return next(errors.notFound(message));
	},

	// Success
	respond(res, data) {
		return res.status(200).send(data);
	}

}
