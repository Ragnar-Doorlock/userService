const ValidationError = require('../../error-handler/apiError');
const ApiError = require('../../error-handler/apiError');
const NotFound = require('../../error-handler/notFound');
const BadRequest = require('../../error-handler/badRequest');

class DeleteUserInteractor {
    constructor (userService) {
        this.userService = userService;
    }

    async execute (id) {
        
        try {

            const numberID = Number(id);
            const userExists = await this.userService.findById(numberID);

            if (!userExists) {
                
                throw new NotFound(404, 'Not Found', `User with id '${id}' was not found`);

            }

            await this.userService.delete(numberID);

        } catch (err) {

            switch (err.name) {
                case 'ValidationError':
                    throw new ValidationError(err.stack);
                case 'SyntaxError':
                    throw new BadRequest(err.stack);
                case 'ReferenceError':
                    throw new ApiError(503, err.name, err.stack);
                case 'NotFound':
                    throw new NotFound(err.httpCode, err.message, err.stack);
                default:
                    throw new ApiError(500, err.name, err.stack);
            }

        }
        
    }
    
}

module.exports = DeleteUserInteractor;