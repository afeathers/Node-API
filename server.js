var Config = global.Config = require('./config/config');

var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var pg = require('pg');
var api = require('./api');
var bodyParser = require('body-parser');

// parse application/json
app.use(bodyParser.json())

// routes
api(app);
app.listen(port, function(err) {
	if(err) {
		console.log('The magic fizzled out on port ' + port, err);
	} else {
		console.log('The magic happens on port ' + port);
	}
});

require('./config/init.js')(app);