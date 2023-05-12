class ApiError {
    constructor(message, error) {
        this.httpCode = 500;
        this.name = 'API Error';
        this.message = message;
        //this.stack = error;
    }
}

module.exports = ApiError;