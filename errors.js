/**
 * errors.js
 * Error factory for building all error objects
 *
 * @module  errors
 * @author  Randy Lebeau
 *
 *
 */


module.exports = {
    badRequest: errorBuilder({
        statusCode: 400,
        message: 'Bad request.'
    }),
    unauthorized: errorBuilder({
        statusCode: 401,
        message: 'Unauthorized.'
    }),
    internalError: errorBuilder({
        statusCode: 500,
        message: 'Internal error.'
    }),
    invalidToken: errorBuilder({
        statusCode: 401,
        message: 'Invalid token.'
    }),
    notFound: errorBuilder({
        statusCode: 404,
        message: 'Not found.'
    })
};


function errorBuilder(errorObject) {

    return function error(message) {

        var err = new Error();

        // Remove stacktrace from all but 500 errors
        if (errorObject.statusCode !== 500) err.stack = '';

        // set status
        err.isError = true;
        err.status = errorObject.statusCode;

        // Message Override
        if (message) {

            // Preserve Objects
            if (typeof(message) === 'object') {
                err = Object.assign(err, message);
            } else {
                err.message = message;
            }

        } else {
            err.message = errorObject.message;
        }

        return err;
    };
}