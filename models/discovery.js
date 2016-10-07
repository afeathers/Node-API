var query = require('../middleware/Postgres').Query;
var DB = 0;

module.exports.getBatch = function() {

	var sql = 'SELECT * FROM users;';
	
	return new Promise((resolve, reject) => {
		query(DB, sql, [id], function(data) {
		    if (!data || data.isError) return reject(data);
		    return resolve(data);
	  	});
	});
}

module.exports.watchProduct = function(product, user) {

	var sql = 'INSERT INTO users(watchlist) VALUES ($1) WHERE id = $2 RETURNING *';
	var params = [ product_id ];

	return new Promise((resolve, reject) => {
		query(DB, sql, params, function(data) {
		    if (!data || data.isError) return reject(data);
		    return resolve(data);
	  	});
	});
}