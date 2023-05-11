const ApiError = require('./apiError');

class ValidationError extends ApiError {
    constructor (error) {
        super(httpCode = 400, message = 'Validation failed', error);
        this.name = this.constructor.name;
    }
}

module.exports = ValidationError;