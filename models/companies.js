var query = require('../middleware/Postgres').Query;
var DB = 0;

module.exports.getAll = function() {

	var sql = 'SELECT * FROM companies;';
	
	return new Promise((resolve, reject) => {
		query(DB, sql, [id], function(data) {
		    if (!data || data.isError) return reject(data);
		    return resolve(data);
	  	});
	});
}

module.exports.getByUser = function(user_id) {

	var sql = 'SELECT uid, username, cid, name, descr, feat FROM users INNER JOIN companies ON $1 = user';

	return new Promise((resolve, reject) => {
		query(DB, sql, [id], function(data) {
			if (!data || data.isError) return reject(data);
			return resolve(data);
		});
	});
}

module.exports.getById = function(id) {

	var sql = 'SELECT * FROM companies WHERE id = $1';

	return new Promise((resolve, reject) => {
		query(DB, sql, [id], function(data) {
		    if (!data || data.isError) return reject(data);
		    return resolve(data);
	  	});
	});
}

module.exports.create = function(user, name, descr, feat, reps, deals) {
	
	var sql = "INSERT INTO companies(user, name, descr, feat, reps, deals) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
	var params = [ user, name, descr, feat, reps, deals ];

	return new Promise((resolve, reject) => {
		query(DB, sql, params, function(data) {
		    if (!data || data.isError) return reject(data);
		    return resolve(data);
	  	});
	});
}