const ApiError = require('./apiError');

class NotFound extends ApiError {
    constructor (httpCode, message, error) {
        super(httpCode, message, error);
        this.name = this.constructor.name;
    }
}

module.exports = NotFound;