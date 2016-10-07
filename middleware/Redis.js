/**
 * RedisMiddleware.js
 * Handles all Redis related methods.
 *
 * Todo
 * - Error Handling
 *
 */

var Redis = require("redis"),
	uuid = require("uuid");

Redis.debug = true;

///////////////////////////////////////

var TOKEN_TTL = (Config.token.expiresInMinutes * 60);
var REVOKED = 'REVOKED';
var REFRESH = 'REFRESH';
var APPROVED = 'APPROVED';
var ACK_TIMEOUT = 3 * 1000;
var RESPONSE_TIMEOUT = 30 * 1000;

// Store for redis clients
var _requests = {};
var _redis_clients = {};


///////////////////////////////////////

var client = Redis.createClient(Config.database.redis.port, Config.database.redis.host, {});

client.on("error", function(err) {
	console.log(err, " Global Redis Error  - Redis[38]\n");
});

///////////////////////////////////////

module.exports = {
	getQueryCache: getQueryCache,
	setQueryCache: setQueryCache,
	deleteAll: deleteAll,
	deleteKey: deleteKey,
	getStringKeyValue: getStringKeyValue,
	setStringKey: setStringKey,
	removeObjectsInKeyRange: removeObjectsInKeyRange,
	removeObjectsByValue: removeObjectsByValue,
	getObjectKey: getObjectKey,
	addObject: addObject,
};


/////////////////////////////
// Control of Redis Utils  //
/////////////////////////////

function deleteAll(next) {
	client.flushall(function (err, numRemoved) {
		return next(err, numRemoved);
	});
}

// STRING METHDOS - Key / Value Array

function deleteKey(key, next) {

	client.del(REVOKED  + ':' + key, REFRESH + ':' + key, function (err, numRemoved) {
        return next(err, numRemoved);
    });
}

function getStringKeyValue(table_name, key, next) {
	client.get(table_name  + ':' + key, function(err, result) {
		// fxlog('Redis Response 73 ' + result);
		if (err) {
			// fxlog('in error ' + err);
			return next(err);
		}
		return next(null, result);
	});
}

function setStringKey(table_name, key, value, next) {
	// fxlog(client);
	// fxlog(key);
	client.setex(table_name  + ':' + key, TOKEN_TTL, value, function(err, result) {
		if (err) return next(err);
		return next(null, result);
	});

}

// SSET METHODS - SORTABLE Key / Value Array

function removeObjectsInKeyRange(table_name, score1, score2, next) {
	// ZREMRANGEBYSCORE approved <user_id> <user_id>

	// console.log(table_name, score1, score2);

	client.zremrangebyscore(table_name, score1, score2, function(err, int_removed) {
		// console.log(int_removed);
		if (err) return next(err);
		return next(null, int_removed);
	});
}

function removeObjectsByValue(table_name, value, next) {
	client.zrem(table_name, value, function(err, int_removed) {
		if (err) return next(err);
		return next(null, int_removed);
	});
}

function getObjectKey(table_name, token, next) {
	 // ZSCORE approved <token>

	client.zscore(table_name, token, function(err, string_key) {
		if (err) return next(err);
		return next(null, string_key);
	});
}

function addObject(table_name, score, token, next) {
	// ZADD approved <user_id> <token>
	// console.log('\naddObject', table_name, score, token);
	client.zadd(table_name, score, token, function(err, int_added) {
		// console.log('\naddObject after', err, int_added);
		if (err) return next(err);
		return next(null, int_added);
	});

}


//////////////////////
// Postgres Caching //
//////////////////////

/**
 * Returns Postgres Query cache
 *
 * @param  {string}   key  sha1 hash
 * @param  {function} next callback
 *
 * @return {function}      Returns cached data or error to callback
 */
function getQueryCache(key, next) {
	client.get('postgres:' + key, function(err, result) {
		if (err || !result) return next(err);
		return next(null, JSON.parse(result));
	});
}

/**
 * Sets Postgres Query Cache
 *
 * @param {string}   key  sha1 hash
 * @param {number}   ttl  Time to live (expiration)
 * @param {array}    data Rows returned from postgres
 * @param {function} next Callback
 *
 * @return {function}      Returns cached data or error to callback
 *
 */
function setQueryCache(key, ttl, data, next) {
	client.setex('postgres:' + key, ttl, JSON.stringify(data), function(err, result) {
		if (err || !result) return next(err);
		return next(null, result);
	});
}


/////////////////
// Order Trail //
/////////////////


/**
 * Gets the trade trail for an order on a given exchange.
 *
 * @param  {Number} ex       `exchange_id`
 * @param  {String} date     date formated YYYYMMDD
 * @param  {String} agent    agent name
 * @param  {Number} group_id group_id
 *
 * @return {Object}          order trail
 *
 */
function getOrderTrail(ex, date, agent, group_id) {

	// fm_tp_01.20140505.eurusd.11
	var key = date + '.' + agent + '.' + group_id;

	_redis_clients[ex].smembers(key, function(err, data) {

		if (err) return new Error(err);
		return data;

	});

}

/**
 * Gets the market data trail for an order on a given exchange
 *
 * @param  {Number} ex `exchange_id`
 *
 * @return {Object}    market data trail
 *
 */
function getMarketDataTrail(ex) {
	// Does nothing for now
	return [];
}




