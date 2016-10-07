var query = require('../middleware/Postgres').Query;
var DB = 0;

module.exports.getAll = function() {

	var sql = 'SELECT * FROM users;';
	
	return new Promise((resolve, reject) => {
		query(DB, sql, [id], function(data) {
		    if (!data || data.isError) return reject(data);
		    return resolve(data);
	  	});
	});

}

module.exports.getById = function(id) {

	var sql = 'SELECT * FROM users WHERE id = $1';

	return new Promise((resolve, reject) => {
		query(DB, sql, [id], function(data) {
		    if (!data || data.isError) return reject(data);
		    return resolve(data);
	  	});
	});

}

module.exports.create = function(title, short_desc, long_desc) {
	
	var sql = "INSERT INTO minerals(title, short_desc, long_desc) VALUES ($1, $2, $3) RETURNING *";
	var params = [ title, short_desc, long_desc ];

	return new Promise((resolve, reject) => {
		query(DB, sql, params, function(data) {
		    if (!data || data.isError) return reject(data);
		    return resolve(data);
	  	});
	});
}