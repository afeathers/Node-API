/**
 * Postgres.js
 * Handles all interactions with postgres
 *
 * @module  Postgres.js
 * @author  Randy Lebeau
 *
 */

var pg = require('pg'),
	crypto = require('crypto'),
	Redis = require('./Redis'),
	errors = require('../errors');

// Increase pool size
pg.defaults.poolSize = 1000;

var types = require('pg').types;
var timestampOID = 1114;

types.setTypeParser(1114, function(stringValue) {
	return stringValue;
});

///////////////////

module.exports = {
	ConnectDB: ConnectDB,
	Query: Query
};

var _connections = {};

/**
 * Stores connection string for database by a unique identifier
 *
 * @param {string} id       Unique ID
 * @param {string} username DB username
 * @param {string} password DB password
 * @param {string} host     DB IP address
 * @param {number} port     DB port
 * @param {string} db       DB name
 *
 */

function ConnectDB(id, protocol, username, password, host, port, db) {

	_connections[id] = protocol.toLowerCase() +
		'://' + username +
		':' + password +
		'@' + host +
		':' + port +
		'/' + db;

}

/**
 * Public method for executing a postgres query.
 * Handles redis caching optionally
 *
 * @param {String}		id  	exchange id
 * @param {String}		query  	Querystring
 * @param {Array}		params 	Array of paramters for the query (empty array for none)
 * @param {Number}   	ttl    	Expiration of cache in seconds (omit for no caching)
 * @param {Function} 	next   	callback in the form of function(err, data)
 *
 */

function Query(id, query, params, ttl, next) {

	var cache = true;

	// If no time to live (ttl)  caching disabled
	if (typeof ttl !== 'number') {
		next = ttl;
		cache = false;
	}

	// Return if no callback
	if (!next) return console.log('YOU MUST PASS A CALL BACK TO QUERY FUNCTION!');
	// If we have caching enabled
	// Check and see if we have a cache in redis
	if (cache) {

		var hash = crypto.createHash('sha1').update(id + query + params.toString()).digest('hex');

		Redis.getQueryCache(hash, function(err, data) {
			if (err || !data) {
				_execute(query, params, ttl, cache, next);
			} else {
				return next(data);
			}
		});

	} else {
		_execute(id, query, params, 0, false, next);
	}

}

/**
 * Executes the Query
 *
 * @param {String}		ex  	exchange-id
 * @param {String}		query  	Querystring
 * @param {Array}		params 	Array of paramters for the query (empty array for none)
 * @param {Number}   	ttl    	Expiration of cache in seconds (omit for no caching)
 * @param {Function} 	next   	callback in the form of function(err, data)
 * @param {Boolean}     cache  	boolean wether or not this is a cached query
 *
 */
function _execute(id, query, params, ttl, cache, next) {

	var hash = crypto.createHash('sha1').update(query + params.toString()).digest('hex');

	pg.connect(_connections[id], function(err, client, done) {
		if (err) {
			done(err);
			console.log(err);
			return next(errors.internalError('Error fetching client from pool'));
		}
		client.query(query, params, function(err, result) {

			if (err) {
				done(err);
				console.log(err);
				return next(errors.internalError(err));
			}

			// If Caching set cache in redis
			if (cache) {

				Redis.setQueryCache(hash, ttl, result.rows, function(err, data) {
					done();
					if (err || !data) {
						done(new Error());
						return next(errors.internalError('Error getting redis cache'));
					}
					return next(result.rows);
				});
			} else {
				done();
				return next(result.rows);
			}

		});
	});
}
