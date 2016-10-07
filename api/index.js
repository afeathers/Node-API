module.exports = function(app) {
	require('./products')(app);
	require('./users')(app);
	require('./companies')(app);
	require('./messages')(app);
}