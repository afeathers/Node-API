var Controller = require('../controllers/');

module.exports = function(app) {

	app.get('/discovery/:user_id', 
        Controller.discovery.getBatch
    );


}