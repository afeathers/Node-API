var Controller = require('../controllers');

module.exports = function(app) {

    app.get('/products/:product_id',
    	Controller.product.getById
    );

    app.get('/products/:category_id',
    	Controller.product.getByCategory
    );

    app.get('/products/featured',
    	Controller.product.getFeatured
    );

    app.get('/products/default',
    	Controller.product.getDefault
    );

    app.post('/products',
    	Controller.product.create
    );

    app.delete('/products/:product_id',
        Controller.product.deleteById
    );

}