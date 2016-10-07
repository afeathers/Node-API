var Controller = require('../controllers');

module.exports = function(app) {

    app.get('/messages/:message_id', 
        Controller.message.getById
    );

    app.post('/messages', 
    	Controller.message.create
    );

}