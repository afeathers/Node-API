/**
 * Neo4j.js
 * Handles all interactions with Neo4j
 *
 * @module  Neo4j.js
 * @author  Alexander Jacobs
 *
 */

var neo4j = require('neo4j-driver').v1;
var config = require('../../config/config');


var _connections = {};
var driver = neo4j.driver(Config.database.neo4j.protocol + '://' + Config.database.neo4j.host + ':' Config.database.neo4j.port, neo4j.auth.basic(Config.database.neo4j.username, Config.database.neo4j.password));


/**
 * Public method for executing a neo4j query.
 * Handles redis caching optionally
 *
 * @param {String}		id  	id
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
 * @param {String}		query  	Querystring
 * @param {Array}		params 	Array of paramters for the query (empty array for none)
 * @param {Number}   	ttl    	Expiration of cache in seconds (omit for no caching)
 * @param {Function} 	next   	callback in the form of function(err, data)
 * @param {Boolean}     cache  	boolean wether or not this is a cached query
 *
 */
function _execute(id, query, params, ttl, cache, next) {

	
	var session = driver.session();

	if (err) {
			done(err);
			console.log(err);
			return next(errors.internalError('Error fetching client from pool'));
	} else {

		session.run(query, params)
		  .then(function(result){
		    result.records.forEach(function(record) {
		      console.log(record._fields);
		    });
		    // Completed!
		    session.close();
		  })
		  .catch(function(error) {
		    console.log(error);
		  });

	}
}