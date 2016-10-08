module.exports = {
	token: {
		expireInMinutes: 20
	},
	database: {
		postgres: {
			protocol: 'postgres', 
			username: 'alexjacobs', 
			password: '', 
			host: 'localhost', 
			port: 5432, 
			db: 'dbname'
		},
		redis: {
			host: '127.0.0.1',
			port: 6379
		}
	}
}
