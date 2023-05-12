const ApiError = require('./apiError');

class Forbidden extends ApiError {
    constructor (message) {
        super(message);
        this.httpCode = 403;
        this.name = this.constructor.name;
    }
}

module.exports = Forbidden;