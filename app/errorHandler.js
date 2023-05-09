class ApiError {
    constructor(message, error) {
        this.message = message;
        this.name = 'API Error';
        this.stack = error;
    }
}

class ValidationError extends ApiError {
    constructor (message, error) {
        super(message, error);
        this.name = this.constructor.name;
    }
}

class NotFound extends ApiError {
    constructor (message) {
        super(message);
        this.name = this.constructor.name;
    }
}

class BadRequest extends ApiError {
    constructor (message, error) {
        super(message, error);
        this.name = this.constructor.name;
    }
}

class Forbidden extends ApiError {
    constructor (message, error) {
        super(message, error);
        this.name = this.constructor.name;
    }
}

module.exports = ApiError, ValidationError, NotFound, BadRequest, Forbidden;