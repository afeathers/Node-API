var Controller = require('../controllers');

module.exports = function(app) {

	function requireRole(role) {
    return function(req, res, next) {
        if(req.session.user && req.session.user.role === role)
            next();
        else
            res.send(403);
    	}
	}

    app.get('/users/:user_id', 
    	requireRole("admin"),
    	Controller.user.getUserById
    );

    app.get('/users/',
    	Controller.user.getUsers
    );

    app.post('/users/:username/:password/:first/:last/:type/:company/:avatar/:website/:interests',
        Controller.user.createUser
    );

}