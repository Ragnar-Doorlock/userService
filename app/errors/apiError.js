class ApiError {
    constructor({httpCode, message}) {
        this.httpCode = httpCode || 500;
        this.name = 'API Error';
        this.message = message;
        //this.stack = error;
    }
}

module.exports = ApiError;