const ApiError = require('./apiError');

class NotFound extends ApiError {
    constructor (message) {
        super(message);
        this.httpCode = 404;
        this.name = this.constructor.name;
    }
}

module.exports = NotFound;