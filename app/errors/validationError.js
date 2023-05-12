const ApiError = require('./apiError');

class ValidationError extends ApiError {
    constructor (message) {
        super(message);
        this.httpCode = 400; 
        this.name = this.constructor.name;
    }
}

module.exports = ValidationError;