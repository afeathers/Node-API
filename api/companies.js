var Controller = require('../controllers');

module.exports = function(app) {
    app.get('/companies/:company_id', 
        Controller.company.getById
    );

    app.get('/companies/:user_id',
    	Controller.company.getByUser
    );

    app.get('/companies',
    	Controller.company.getAll
    );

    app.post('/companies', 
    	Controller.company.create
    );

}