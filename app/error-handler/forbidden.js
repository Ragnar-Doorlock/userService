const ApiError = require('./apiError');

class Forbidden extends ApiError {
    constructor (error) {
        super(httpCode = 403, message = 'Bad request', error);
        this.name = this.constructor.name;
    }
}

module.exports = Forbidden;