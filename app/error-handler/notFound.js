const ApiError = require('./apiError');

class NotFound extends ApiError {
    constructor (error) {
        super(httpCode = 404, message = 'NOT FOUND', error);
        this.name = this.constructor.name;
    }
}

module.exports = NotFound;