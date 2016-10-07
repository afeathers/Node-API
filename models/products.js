var query = require('../middleware/Postgres').Query;
var DB = 0;

module.exports.getById = function(id) {

	var sql = 'SELECT * FROM products WHERE id = $1';

	return new Promise((resolve, reject) => {
		query(DB, sql, [id], function(data) {
		    if (!data || data.isError) return reject(data);
		    return resolve(data);
	  	});
	});

}

module.exports.getByCategory = function(id) {

	var sql = 'SELECT * FROM products WHERE id = $1';

	return new Promise((resolve, reject) => {
		query(DB, sql, [id], function(data) {
		    if (!data || data.isError) return reject(data);
		    return resolve(data);
	  	});
	});

}

module.exports.deleteById = function(id) {

	var sql = 'DELETE FROM products WHERE id = $1';

	return new Promise((resolve, reject) => {
		query(DB, sql, [id], function(data) {
		    if (!data || data.isError) return reject(data);
		    return resolve(data);
	  	});
	});

}

module.exports.getDefault = function(id) {

	var sql = 'SELECT * FROM products WHERE id = $1';

	return new Promise((resolve, reject) => {
		query(DB, sql, [id], function(data) {
		    if (!data || data.isError) return reject(data);
		    return resolve(data);
	  	});
	});

}

module.exports.getFeatured = function() {

	var sql = 'SELECT * FROM products WHERE featured = true';

	return new Promise((resolve, reject) => {
		query(DB, sql, [], function(data) {
		    if (!data || data.isError) return reject(data);
		    return resolve(data);
	  	});
	});

}

module.exports.create = function(owner, title, video, web, short, long, pat, feat, images, indu, tags) {
	
	var sql = "INSERT INTO products(owner, title, video, web, short, long, pat, feat, images, indu, tags) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *";
	var params = [ owner, title, video, web, short, long, pat, feat, images, indu, tags ];

	return new Promise((resolve, reject) => {
		query(DB, sql, params, function(data) {
		    if (!data || data.isError) return reject(data);
		    return resolve(data);
	  	});
	});
}