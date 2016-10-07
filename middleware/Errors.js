/**
 * Errors.js
 * Middleware for error handling
 *
 * @module  Errors
 * @author  Randy Lebeau
 *
 */

module.exports = function(err, req, res, next) {
    // console.log(err);
    if (err) {
        if (err.isError) {

            // console.log('\nErrors', err);
            if(err.err && err.err.message && !err.message) err.message = err.err.message;

            // Log and alert on flagged errors
            // if(err.flag) Logger.log('errFlag', err.flag, true);

            var errorObj = {
                id: err.uuid,
                status: err.status,
                title: err.title || 'Error',
                message: err.message,
                flag: err.flag,
            };
            return res.status(err.status).send(errorObj);
        }
    }
    return res.status(500).send({
        status: 500,
        title: 'Internal Server Error',
        message: 'Please contact support.'
    });
};
