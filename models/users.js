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

module.exports.create = function(username, password, first, last, comp, type, ava, website, inter) {
	
	var sql = 'INSERT INTO users(username, password, first, last, comp, type, ava, website, inter) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *';
	var params = [ username, password, first_name, last_name, companies, usertype, avatar, website, interests ];

	return new Promise((resolve, reject) => {
		query(DB, sql, params, function(data) {
		    if (!data || data.isError) return reject(data);
		    return resolve(data);
	  	});
	});
}