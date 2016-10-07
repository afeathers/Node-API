/**
 * init.js
 * Initializes all data flows
 *
 * @module  init
 * @author  Alexander Jacobs
 *
 */

 var Postgres = require('../middleware/Postgres'),
	crypto = require('crypto');

// Models
//var Mineral = require('../models/minerals');

module.exports = function(app) {

	Postgres.ConnectDB(
		0,
		Config.database.postgres.protocol,
		Config.database.postgres.username,
		Config.database.postgres.password,
		Config.database.postgres.host,
		Config.database.postgres.port,
		Config.database.postgres.db
	);

	function _decrypt(text) {
		var decipher = crypto.createDecipher('aes-256-cbc', Config.security.cypherSalt);
		var dec = decipher.update(text, 'hex', 'utf8');
		dec += decipher.final('utf8');
		return dec;
	}

}