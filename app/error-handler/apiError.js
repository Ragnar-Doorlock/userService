class ApiError {
    constructor(httpCode, message, error) {
        this.httpCode = httpCode;
        this.message = message;
        this.name = 'API Error';
        this.stack = error;
    }
}

module.exports = ApiError;