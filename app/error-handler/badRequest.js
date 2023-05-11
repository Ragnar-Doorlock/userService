const ApiError = require('./apiError');

class BadRequest extends ApiError {
    constructor (error) {
        super(httpCode = 400, message = 'Bad request', error);
        this.name = this.constructor.name;
    }
}

module.exports = BadRequest;